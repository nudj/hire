const _pick = require('lodash/pick')
const { Redirect } = require('@nudj/framework/errors')

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
    mutation AddConnections (
      $userId: ID!,
      $surveySlug: String,
      $connections: [PersonCreateInput!]!
    ) {
      user (email: $userId) {
        newConnections: getOrCreateConnections (
          to: $connections
        ) {
          id
          to {
            id
            firstName
            lastName
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
    connections: body.connections.map(connection => _pick(connection, ['firstName', 'lastName', 'email', 'title', 'company']))
  }
  const respond = (data) => {
    throw new Redirect({
      url: '/connections',
      notification: {
        type: 'success',
        message: `${data.person.hirer.person.newConnections.length} connections uploaded successfully 😎`
      }
    })
  }
  return { gql, variables, respond }
}

module.exports = {
  get,
  post
}
