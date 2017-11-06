const _pick = require('lodash/pick')
const { merge } = require('@nudj/library')
const { Redirect } = require('@nudj/framework/errors')
const request = require('../../lib/request')
const { GlobalFragment } = require('../../lib/graphql')

const get = async ({
  data,
  params
}) => {
  const query = `
    query PageData ($userEmail: String) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        ...Global
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: "aided-recall-baby"
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
    ${GlobalFragment}
  `
  const variables = {
    userEmail: data.user.email
  }
  const responseData = await request('/', {
    baseURL: `http://${process.env.API_HOST}:82`,
    method: 'post',
    data: {
      query,
      variables
    }
  })
  return merge(data, responseData.data)
}

const post = async ({
  data,
  params,
  body
}) => {
  const mutation = `
    mutation AddConnections ($userEmail: String!, $to: [PersonCreateInput!]!) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          ...Global
          ...Page
          person {
            newConnections: getOrCreateConnections (
              to: $to
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
        }
      }
    }
    fragment Global on Hirer {
      person {
        incompleteTaskCount
      }
      company {
        onboarded
      }
    }
    fragment Page on Hirer {
      company {
        survey: surveyByFilters (filters: {
          slug: "aided-recall-baby"
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
  `
  const variables = {
    userEmail: data.user.email,
    to: body.connections.map(connection => _pick(connection, ['firstName', 'lastName', 'email', 'title', 'company']))
  }
  await request('/', {
    baseURL: `http://${process.env.API_HOST}:82`,
    method: 'post',
    data: {
      query: mutation,
      variables
    }
  })
  throw new Redirect({
    url: '/connections',
    notification: {
      type: 'success',
      message: 'Connections uploaded successfully 😎'
    }
  })
}

module.exports = {
  get,
  post
}
