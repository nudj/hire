const { Global } = require('../../lib/graphql')

const getContacts = ({ session, query }) => {
  const preSearchQuery = `
    query SurveyQuestionPage($userId: ID!, $blankSearch: Boolean!) {
      user(id: $userId) {
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

const postContact = ({ session, params, body }) => {
  const gql = `
    mutation addNewContact (
      $userId: ID!
      $firstName: String!
      $lastName: String!
      $email: String!
      $title: String
      $company: String
      $source: SourceCreateInput!
    ) {
      user (id: $userId) {
        newContact: getOrCreateConnection (
          to: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            title: $title,
            company: $company
          }
          source: $source
        ) {
          id
        }
      }
    }
  `
  const variables = {
    userId: session.userId,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    title: body.title,
    company: body.company,
    source: { name: 'manual' }
  }
  return { gql, variables }
}

module.exports = {
  getContacts,
  postContact
}
