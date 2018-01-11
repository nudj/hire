const { Redirect } = require('@nudj/framework/errors')

const { emailProviderPreferenceTypes } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')

const get = ({ session, params }) => {
  const gql = `
    mutation SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      surveyAnswer: surveyAnswerByFilters (filters: {
        person: $userId
      }) {
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
          source {
            name
          }
          person {
            id
            email
          }
        }
      }
      user (id: $userId) {
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              outroTitle
              outroDescription
              sections: surveySections {
                id
                questions: surveyQuestions {
                  id
                  type
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

const setEmailPreference = ({ body, query, session }) => {
  const gql = `
    mutation SetEmailPreference(
      $userId: ID!,
      $data: PersonUpdateInput!,
      $surveySlug: String
    ) {
      updatePerson(id: $userId, data: $data) {
        id
        emailPreference
        hirer {
          company {
            survey: surveysByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              outroTitle
              outroDescription
              sections: surveySections {
                id
                questions: surveyQuestions {
                  id
                  type
                }
              }
            }
          }
        }
      }
      surveyAnswer: surveyAnswerByFilters (filters: {
        person: $userId
      }) {
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

  const variables = {
    userId: session.userId,
    data: {
      emailPreference: body.emailProvider
    }
  }

  const respond = data => {
    if (body.emailProvider === emailProviderPreferenceTypes.GOOGLE) {
      session.returnTo = `/conversations/new/${query.id}`
      session.returnFail = `/connections?id=${query.id}`
      throw new Redirect({
        url: '/auth/google'
      })
    }

    throw new Redirect({
      url: `/connections?id=${query.id}`
    })
  }

  return { gql, variables, respond }
}

module.exports = {
  get,
  setEmailPreference
}
