const _get = require('lodash/get')
const startCase = require('lodash/startCase')
const { Redirect, NotFound } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const get = async ({ params }) => {
  const type = params.type.toUpperCase()

  const gql = `
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
  const variables = { type }

  return { gql, variables }
}

const post = ({ body, params }) => {
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
  const respond = data => {
    throw new Redirect({
      url: '/integrations',
      notification: {
        type: 'info',
        message: `${startCase(params.type)} integration added`
      }
    })
  }

  return { gql, variables, respond }
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

  return { gql, variables, transformData }
}

const verifyIntegration = ({ params }) => {
  const gql = `
    mutation verifyIntegration ($type: CompanyIntegrationType!) {
      user {
        id
        hirer {
          company {
            integration: integrationByFilters(filters: { type: $type }) {
              verify
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
  // Return an object with the error on it
  const catcher = error => ({ error })

  return { gql, variables, catcher }
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
  // Return an object with the error on it
  const catcher = error => ({ error })

  return { gql, variables, catcher }
}

module.exports = {
  get,
  post,
  patch,
  syncIntegration,
  verifyIntegration
}
