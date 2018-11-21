const _get = require('lodash/get')
const startCase = require('lodash/startCase')
const { Redirect, NotFound } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')
const { convertErrorToErroredFields } = require('./helpers')

const integrationPageQuery = `
  query getIntegrationPage ($type: CompanyIntegrationType!) {
    user {
      id
      email
      hirer {
        company {
          id
          name
          integration: integrationByFilters(filters: { type: $type }) {
            id
            type
            data
          }
        }
      }
    }
    ${Global}
  }
`

const get = async ({ params }) => {
  const type = params.type.toUpperCase()
  const gql = integrationPageQuery
  const variables = { type }

  return { gql, variables }
}

const post = ({ body, params, requestGQL }) => {
  const gql = `
    mutation createIntegration ($type: CompanyIntegrationType!, $data: Data!) {
      user {
        id
        email
        hirer {
          company {
            integration: createIntegration (type: $type, data: $data) {
              id
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    type: params.type.toUpperCase(),
    data: body.data
  }
  const catcher = async error => {
    const data = await requestGQL({
      gql: integrationPageQuery,
      variables: {
        type: params.type.toUpperCase()
      }
    })
    const verificationErrors = convertErrorToErroredFields(error)

    return { ...data, verificationErrors }
  }
  const respond = data => {
    throw new Redirect({
      url: '/integrations',
      notification: {
        type: 'info',
        message: `${startCase(params.type)} integration added`
      }
    })
  }

  return { gql, variables, respond, catcher }
}

const patch = async ({ body, params, requestGQL }) => {
  const type = params.type.toUpperCase()
  const { user } = await requestGQL({
    gql: `
      query getIntegration ($type: CompanyIntegrationType!) {
        user {
          id
          hirer {
            company {
              integration: integrationByFilters(filters: { type: $type }) {
                id
              }
            }
          }
        }
      }
    `,
    variables: {
      type
    }
  })

  if (!_get(user, 'hirer.company.integration')) {
    throw new NotFound({ log: [`User attempted to update an integration of type "${type}"`] })
  }

  const gql = `
    mutation updateIntegration ($integrationId: ID!, $data: Data!) {
      user {
        id
        email
        hirer {
          company {
            id
            name
            integrations {
              id
              type
              data
            }
            integration: updateIntegration (id: $integrationId, data: $data) {
              id
              type
              data
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    integrationId: user.hirer.company.integration.id,
    data: body.data
  }
  const transformData = data => {
    data.notification = {
      type: 'info',
      message: `${startCase(params.type)} integration updated`
    }

    return data
  }
  const catcher = async error => {
    const data = await requestGQL({
      gql: integrationPageQuery,
      variables: { type }
    })
    const verificationErrors = convertErrorToErroredFields(error)

    return { ...data, verificationErrors }
  }

  return { gql, variables, transformData, catcher }
}

const syncIntegration = ({ params }) => {
  const gql = `
    mutation verifyIntegration ($type: CompanyIntegrationType!) {
      user {
        id
        hirer {
          company {
            integration: integrationByFilters(filters: { type: $type }) {
              sync
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    type: params.type.toUpperCase()
  }

  const catcher = () => {
    throw new Redirect({
      url: `/integrations/${params.type}`,
      notification: {
        type: 'error',
        message: `${startCase(params.type)} syncing failed. Please check your credentials.`
      }
    })
  }

  const respond = data => {
    throw new Redirect({
      url: `/integrations/${params.type}`,
      notification: {
        type: 'success',
        message: `${startCase(params.type)} synced successfully`
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post,
  patch,
  syncIntegration
}
