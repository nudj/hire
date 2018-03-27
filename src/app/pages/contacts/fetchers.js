const { dataSources } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')

const getContacts = ({ session, query }) => {
  const gql = `
    query ContactsSearch($userId: ID!, $search: String!, $filters: ConnectionSearchFilters) {
      user(id: $userId) {
        results: searchConnections(query: $search, filters: $filters) {
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
            tags {
              id
              type
              name
            }
          }
          tags {
            id
            type
            name
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    search: query.search || '',
    filters: {
      favourites: query.favourites === 'true',
      expertiseTags: query.expertiseTags
    }
  }

  return {
    gql,
    variables
  }
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
