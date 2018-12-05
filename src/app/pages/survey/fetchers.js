const { NotFound, Redirect } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const get = ({ params }) => {
  const gql = `
    query SurveyPage ($surveySlug: String) {
      user {
        id
        emailPreference
        hirer {
          id
          company {
            id
            name
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              status
              introTitle
              introDescription
              questions: surveyQuestions {
                id
                type
                title
                answer: answerOfUser {
                  id
                  connections {
                    id
                    firstName
                    lastName
                    person {
                      id
                      email
                    }
                  }
                }
              }
            }
          }
        }
      }
      emailPreferences: __type(name: "EmailPreference") {
        values: enumValues {
          name
        }
      }
      surveyStatuses: __type(name: "SurveyStatus") {
        values: enumValues {
          name
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug: params.surveySlug
  }
  const transformData = data => {
    const surveyStatuses = createEnumMap(data.surveyStatuses.values)
    const survey = data.user.hirer.company.survey

    if (survey.status !== surveyStatuses.PUBLISHED) {
      throw new NotFound({ log: [`User attempted to access a survey of status "${survey.status}"`] })
    }

    const unansweredQuestions = survey.questions.reduce((unansweredQuestions, question) => {
      if (!question.answer) {
        unansweredQuestions.push(question)
      }
      return unansweredQuestions
    }, [])

    if (
      // has the survey been started?
      unansweredQuestions.length &&
      // has the survey been finished?
      unansweredQuestions.length !== survey.questions.length
    ) {
      // the survey is only partially completed
      // redirect to the first unanswered question
      throw new Redirect({
        url: `/surveys/${survey.slug}/questions/${unansweredQuestions[0].id}`
      })
    }

    data.emailPreferences = createEnumMap(data.emailPreferences.values)

    return data
  }
  return { gql, variables, transformData }
}

module.exports = {
  get
}
