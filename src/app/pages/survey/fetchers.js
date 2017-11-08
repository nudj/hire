const _pick = require('lodash/pick')
const { Redirect } = require('@nudj/framework/errors')
const { merge } = require('@nudj/library')

const pageFragment = `
  fragment Page on Mutation {
    person: personByFilters (filters: {
      email: $userEmail
    }) {
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
  }
`
function getPageVariables (ctx) {
  return {
    surveySlug: {
      type: 'String',
      value: ctx.params.surveySlug
    }
  }
}

function get (ctx) {
  return {
    fragment: pageFragment,
    variables: getPageVariables(ctx)
  }
}

function post (ctx) {
  const fragment = `
    fragment Page on Mutation {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          person {
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
          }
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
    }
  `
  const variables = merge(getPageVariables(ctx), {
    connections: {
      type: '[PersonCreateInput!]!',
      value: ctx.body.connections.map(connection => _pick(connection, ['firstName', 'lastName', 'email', 'title', 'company']))
    }
  })
  return {
    fragment,
    variables,
    respond: () => {
      throw new Redirect({
        url: '/connections',
        notification: {
          type: 'success',
          message: 'Connections uploaded successfully 😎'
        }
      })
    }
  }
}

module.exports = {
  get,
  post
}
