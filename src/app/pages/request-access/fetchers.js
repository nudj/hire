const get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

const getPage = ({ query, params, session }) => {
  const gql = `
    query requestAccessPage ($slug: String!, $personId: ID!) {
      company: companyByFilters(filters: { slug: $slug }) {
        name
        slug
        accessRequest: accessRequestByFilters(filters: { person: $personId }) {
          acceptedBy {
            id
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    slug: params.companySlug,
    personId: session.userId
  }

  const transformData = data => {
    // If access request is accepted, redirect to home
    if (get(data, 'company.accessRequest.acceptedBy')) {
      throw new Redirect({ url: '/' })
    }
    return data
  }

  return {
    gql,
    variables,
    transformData
  }
}

const post = ({ params, session }) => {
  const gql = `
    mutation requestAccess ($slug: String!, $personId: ID!) {
      company: companyByFilters(filters: { slug: $slug }) {
        name
        slug
        accessRequest: createAccessRequest(person: $personId) {
          id
        }
      }
      ${Global}
    }
  `
  const variables = {
    personId: session.userId,
    slug: params.companySlug
  }

  return { gql, variables }
}

module.exports = {
  get: getPage,
  post
}
