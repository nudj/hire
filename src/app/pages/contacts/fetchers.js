const { dataSources } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const getContacts = ({ query }) => {
  const gql = `
    query ContactsSearch($search: String!, $filters: ConnectionSearchFilters) {
      hirerTypeEnum: __type(name: "HirerType") {
        values: enumValues {
          name
        }
      }
      user {
        hirer {
          type
        }
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
    search: query.search || '',
    filters: {
      favourites: query.favourites === 'true',
      expertiseTags: query.expertiseTags
    }
  }

  const transformData = data => {
    console.log('TRANSFORMUNG DDATA')
    const hirerTypes = createEnumMap(data.hirerTypeEnum.values)

    return {
      ...data,
      enums: { hirerTypes }
    }
  }

  return {
    gql,
    variables,
    transformData
  }
}

const postContact = ({ params, body }) => {
  const gql = `
    mutation addNewContact (
      $to: ConnectionCreateInput!
      $source: DataSource!
    ) {
      user {
        newContact: getOrCreateConnection (
          to: $to
          source: $source
        ) {
          id
        }
      }
      ${Global}
    }
  `
  const variables = {
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
