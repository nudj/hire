const { Redirect } = require('@nudj/framework/errors')

const { values: emailPreferences } = require('@nudj/api/gql/schema/enums/email-preference-types')
const { Global } = require('../../lib/graphql')

const completeSurvey = ({ session, params }) => {
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
          setOnboarded
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

const setEmailPreference = ({ body, params, query, session }) => {
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
    surveySlug: params.surveySlug,
    data: {
      emailPreference: body.emailProvider
    }
  }

  const respond = data => {
    if (body.emailProvider === emailPreferences.GOOGLE) {
      session.returnTo = `/messages/new/${query.id}`
      session.returnFail = `/surveys/${params.surveySlug}/complete`
      throw new Redirect({
        url: '/auth/google'
      })
    }

    throw new Redirect({
      url: `/messages/new/${query.id}`
    })
  }

  return { gql, variables, respond }
}

module.exports = {
  completeSurvey,
  setEmailPreference
}
