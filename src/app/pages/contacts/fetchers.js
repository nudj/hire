const { Global } = require('../../lib/graphql')

const getContacts = ({ session, query }) => {
  const preSearchQuery = `
    query SurveyQuestionPage($userId: ID!, $blankSearch: Boolean!) {
      user(id: $userId) {
        connectionsCount
        connections @include(if: $blankSearch) {
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
    userId: session.userId,
    blankSearch: query.search === ''
  }

  const preSearchVariables = commonVariables

  const searchVariables = {
    ...commonVariables,
    search: query.search,
    fields: [['firstName', 'lastName']]
  }

  return query.search
    ? { gql: searchQuery, variables: searchVariables }
    : { gql: preSearchQuery, variables: preSearchVariables }
}

module.exports = {
  getContacts
}
