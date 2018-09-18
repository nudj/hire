const { dataSources } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')
const { cookies } = require('@nudj/library')

const getContacts = ({ req, res, query }) => {
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
    const hirerTypes = createEnumMap(data.hirerTypeEnum.values)
    const surveyRecentlyCompleted = cookies.get(req, 'surveyRecentlyCompleted')
    cookies.set(res, 'surveyRecentlyCompleted', false)

    return {
      ...data,
      surveyRecentlyCompleted: surveyRecentlyCompleted === 'true',
      enums: { hirerTypes }
    }
  }

  return {
    gql,
    variables,
    transformData
  }
}

const postContact = ({ params, body, analytics }) => {
  /**
   * While this should be a mutation, the page's dependency on `hirerTypeEnum`
   * prevents us from using it
   */
  const gql = `
    query addNewContact (
      $to: ConnectionCreateInput!
      $source: DataSource!
    ) {
      hirerTypeEnum: __type(name: "HirerType") {
        values: enumValues {
          name
        }
      }
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

  const transformData = data => {
    const hirerTypes = createEnumMap(data.hirerTypeEnum.values)

    analytics.track({
      object: analytics.objects.connection,
      action: analytics.actions.connection.created,
      properties: {
        source: dataSources.MANUAL
      }
    })

    return {
      ...data,
      enums: { hirerTypes }
    }
  }

  return { gql, variables, transformData }
}

module.exports = {
  getContacts,
  postContact
}
