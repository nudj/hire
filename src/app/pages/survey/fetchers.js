const { Global } = require('../../lib/graphql')

const get = ({
  session,
  params
}) => {
  const gql = `
    query SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      user (id: $userId) {
        connections {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
          }
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              sections: surveySections {
                id
                title
                description
                questions: surveyQuestions {
                  id
                  title
                  description
                  name
                  type
                  required
                  dependencies
                  options
                  tags
                }
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    userId: session.userId,
    surveySlug: params.surveySlug
  }
  return { gql, variables }
}

const post = ({
  session,
  params,
  body
}) => {
  const gql = `
    mutation AddConnection (
      $userId: ID!,
      $surveySlug: String,
      $connection: PersonCreateInput!,
      $source: String!
    ) {
      user (id: $userId) {
        newConnection: getOrCreateConnection (
          to: $connection,
          source: $source
        ) {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
          }
        }
        connections {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
          }
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              sections: surveySections {
                id
                title
                description
                questions: surveyQuestions {
                  id
                  title
                  description
                  name
                  type
                  required
                  dependencies
                  options
                  tags
                }
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    userId: session.userId,
    surveySlug: params.surveySlug,
    connection: body.connection,
    source: body.source
  }
  return { gql, variables }
}

module.exports = {
  get,
  post
}
