const isNil = require('lodash/isNil')

const { Global } = require('../../lib/graphql')

const getContacts = ({ session, query }) => {
  const preSearchQuery = `
    query SurveyQuestionPage($userId: ID!) {
      user(id: $userId) {
        connectionsCount
        connections {
          id
          firstName
          lastName
          role {
            name
          }
          company {
            name
          }
          source {
            name
          }
          person {
            id
            email
          }
        }
      }
      ${Global}
    }
  `

  const searchQuery = `
    query SurveyQuestionPage($userId: ID!, $search: String!, $fields: [[String!]!]!) {
      user(id: $userId) {
        connectionsCount
        connections: searchConnections(query: $search, fields: $fields) {
          id
          firstName
          lastName
          role {
            name
          }
          company {
            name
          }
          source {
            name
          }
          person {
            id
            email
          }
        }
      }
      ${Global}
    }
  `

  const commonVariables = {
    userId: session.userId
  }

  const preSearchVariables = commonVariables

  const searchVariables = {
    ...commonVariables,
    search: query.search,
    fields: [['firstName', 'lastName']]
  }

  return !isNil(query.search)
    ? { gql: searchQuery, variables: searchVariables }
    : { gql: preSearchQuery, variables: preSearchVariables }
}

module.exports = {
  getContacts
}
