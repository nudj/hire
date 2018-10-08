const { Redirect } = require('@nudj/library/errors')
const omit = require('lodash/omit')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            id
            name
            description
          }
        }
      }
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body, analytics }) => {
  const gql = `
    mutation updateCompany ($companyId: ID!, $companyUpdate: CompanyUpdateInput!) {
      company: updateCompany(id: $companyId, companyUpdate: $companyUpdate) {
        name
        description
      }
    }
  `

  const variables = {
    companyUpdate: omit(body, 'companyId'),
    companyId: body.companyId
  }

  const respond = data => {
    analytics.track({
      object: analytics.objects.company,
      action: analytics.actions.company.updated,
      properties: {
        companyName: data.company.name,
        companyDescription: data.company.description
      }
    })

    throw new Redirect({
      url: '/company-settings',
      notification: {
        type: 'info',
        message: `${data.company.name} updated`
      }
    })
  }

  const catcher = (e) => {
    throw new Redirect({
      url: '/company-settings',
      notification: {
        type: 'error',
        message: 'Something went wrong while updating your settings. Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
