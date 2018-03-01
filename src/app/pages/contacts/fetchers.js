const { values: dataSources } = require('@nudj/api/gql/schema/enums/data-sources')
const { Global } = require('../../lib/graphql')

const getContacts = ({ session, query }) => {
  const preSearchQuery = `
    query SurveyQuestionPage($userId: ID!) {
      user(id: $userId) {
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
          person {
            id
            email
          }
          source
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
          person {
            id
            email
          }
          source
        }
      }
      ${Global}
    }
  `

  const commonVariables = { userId: session.userId }

  const preSearchVariables = commonVariables

  const searchVariables = {
    ...commonVariables,
    search: query.search,
    fields: [
      ['firstName', 'lastName'],
      ['company.name'],
      ['person.email']
    ]
  }

  return query.search
    ? { gql: searchQuery, variables: searchVariables }
    : { gql: preSearchQuery, variables: preSearchVariables }
}

const postContact = ({ session, params, body }) => {
  const gql = `
    mutation addNewContact (
      $userId: ID!
      $to: ConnectionCreateInput!
      $source: DataSource!
    ) {
      user (id: $userId) {
        newContact: getOrCreateConnection (
          to: $to
          source: $source
        ) {
          id
        }
      }
    }
  `
  const variables = {
    userId: session.userId,
    to: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      title: body.title,
      company: body.company
    },
    source: dataSources.MANUAL
  }
  return { gql, variables }
}

module.exports = {
  getContacts,
  postContact
}
