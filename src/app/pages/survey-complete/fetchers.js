const get = require('lodash/get')
const { Redirect } = require('@nudj/framework/errors')

const { emailPreferences } = require('../../lib/constants')
const { Global } = require('../../lib/graphql')

const completeSurvey = ({ session, params, res }) => {
  const gql = `
    mutation SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      surveyAnswers: surveyAnswersByFilters (filters: {
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
          person {
            id
            email
            firstName
            lastName
          }
          source
        }
      }
      user (id: $userId) {
        emailPreference
        hirer {
          onboarded
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

  const transformData = data => {
    const newlyOnboarded = !get(data, 'user.hirer.onboarded', false) && get(data, 'user.hirer.setOnboarded', false)
    if (newlyOnboarded) res.cookie('newlyOnboarded', true)

    return data
  }

  return { gql, variables, transformData }
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
          person {
            id
            email
          }
          source
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

  const respondGoogle = () => {
    session.returnTo = `/messages/new/${query.id}`
    session.returnFail = `/surveys/${params.surveySlug}/complete`
    throw new Redirect({
      url: '/auth/google'
    })
  }

  if (body.emailProvider === emailPreferences.GOOGLE) {
    return { respond: respondGoogle }
  }

  return {
    gql,
    variables,
    respond: () => {
      throw new Redirect({
        url: `/messages/new/${query.id}`
      })
    }
  }
}

module.exports = {
  completeSurvey,
  setEmailPreference
}
