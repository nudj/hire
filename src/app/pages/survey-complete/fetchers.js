const get = require('lodash/get')
const uniqBy = require('lodash/uniqBy')
const flatten = require('lodash/flatten')
const { Redirect } = require('@nudj/framework/errors')
const logger = require('@nudj/framework/logger')
const { cookies } = require('@nudj/library')

const { emailPreferences } = require('../../lib/constants')
const intercom = require('../../lib/intercom')
const { Global } = require('../../lib/graphql')
const { jobStatuses, memberTypes } = require('../../lib/constants')

const completeSurvey = ({ session, params, res }) => {
  const gql = `
    mutation SurveyPage (
      $userId: ID!,
      $surveySlug: String,
      $jobStatus: JobStatus
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
          tags {
            id
            type
            name
          }
        }
      }
      user {
        email
        emailPreference
        hirer {
          type
          onboarded
          company {
            publishedJobs: jobsByFilters(filters: { status: $jobStatus }) {
              id
            }
            survey: surveyByFiltersOrDefault (filters: {
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
    surveySlug: params.surveySlug,
    JobStatus: jobStatuses.PUBLISHED
  }

  const transformData = data => {
    const newlyOnboarded = !get(data, 'user.hirer.onboarded', false) && get(data, 'user.hirer.setOnboarded', false)
    if (newlyOnboarded) cookies.set(res, 'newlyOnboarded', true)

    try {
      const favourites = flatten(data.surveyAnswers.map(answer => answer.connections))
      intercom.logEvent({
        event_name: 'survey completed',
        email: data.user.email,
        metadata: {
          category: 'onboarding'
        }
      })
      intercom.updateUser({
        email: data.user.email,
        custom_attributes: {
          favourites: uniqBy(favourites, 'id').length
        }
      })
    } catch (error) {
      logger.log('error', 'Intercom Error', data.user.email, error)
    }

    const { publishedJobs } = data.user.hirer.company
    const answers = flatten(data.surveyAnswers.map(answer => {
      return answer.connections
    }))

    // If a user has no published jobs, redirect them if they have actual survey answers
    if (!publishedJobs.length && answers) {
      cookies.set(res, 'surveyRecentlyCompleted', true)
      const { hirer } = data.user

      throw new Redirect({
        url: hirer.type === memberTypes.ADMIN ? '/' : '/discover?favourites=true'
      })
    }

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
