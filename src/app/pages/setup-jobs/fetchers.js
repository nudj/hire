const { Redirect } = require('@nudj/framework/errors')

const { createNotification } = require('../../lib')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            id
          }
        }
      }
    }
  `

  return { gql }
}

const postOnboarding = ({ body }) => {
  const { companyId } = body
  const gql = `
    mutation SetCompany ($companyId: ID!, $companyUpdate: CompanyUpdateInput!) {
      updateCompany(
        id: $companyId,
        companyUpdate: $companyUpdate
      ) {
        id
        name
        onboarded
      }
      user {
        hirer {
          setOnboarded
        }
      }
    }
  `
  const variables = {
    companyId,
    companyUpdate: {
      onboarded: true
    }
  }
  const respond = () => {
    throw new Redirect({
      url: '/',
      notification: createNotification(
        'success',
        'Welcome to nudj! 🎉'
      )
    })
  }

  return { gql, variables, respond }
}

module.exports = {
  get,
  postOnboarding
}
