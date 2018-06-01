const { Redirect } = require('@nudj/framework/errors')

const { Global } = require('../../lib/graphql')
const { createNotification } = require('../../lib')

const get = () => {
  const gql = `
    query {
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body }) => {
  const gql = `
    mutation setupCompany ($company: CompanyCreateInput!) {
      user {
        addCompanyAndAssignUserAsHirer(company: $company) {
          id
        }
      }
    }
  `
  const variables = {
    company: {
      ...body,
      client: true
    }
  }
  const respond = () => {
    const companyName = body.name
    throw new Redirect({
      url: '/setup-jobs',
      notification: createNotification(
        'success',
        `${companyName} created!`
      )
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/setup-company',
      notification: {
        type: 'error',
        message: 'Something went wrong while setting up your company! Please try again.'
      }
    })
  }

  return { gql, variables, catcher, respond }
}

module.exports = {
  get,
  post
}
