const _pick = require('lodash/pick')

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
          to {
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
      $connection: PersonCreateInput!
    ) {
      user (id: $userId) {
        newConnection: getOrCreateConnection (
          to: $connection
        ) {
          id
          firstName
          lastName
          title
          company
          to {
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
          to {
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
    connection: _pick(body.connection, ['firstName', 'lastName', 'email', 'title', 'company'])
  }
  return { gql, variables }
}

module.exports = {
  get,
  post
}
