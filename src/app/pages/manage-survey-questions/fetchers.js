const { Global } = require('../../lib/graphql')

const get = async ({ params: { surveySlug } }) => {
  const gql = `
    query getSurvey ($surveySlug: String!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
              introTitle
              questions: surveyQuestions {
                id
                description
                title
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = { surveySlug }

  return { gql, variables }
}

const patch = async ({ body: { surveyQuestions }, params: { surveySlug } }) => {
  const gql = `
    query updateSurveyQuestionOrder ($surveySlug: String!, $surveyQuestions: [ID!]) {
      user {
        hirer {
          company {
            survey: updateSurveyByFilters(filters: { slug: $surveySlug }, data: { surveyQuestions: $surveyQuestions }) {
              id
              slug
              introTitle
              questions: surveyQuestions {
                id
                description
                title
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug,
    surveyQuestions
  }
  const transformData = data => {
    data.notification = {
      type: 'info',
      message: 'Questions reordered'
    }

    return data
  }

  return { gql, variables, transformData }
}

module.exports = {
  get,
  patch
}
