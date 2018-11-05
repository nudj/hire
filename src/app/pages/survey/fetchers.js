const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query SurveyPage ($surveySlug: String) {
      user {
        hirer {
          company {
            name
            survey: surveyByFiltersOrDefault (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              introTitle
              introDescription
              questions: surveyQuestions {
                id
                type
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug: params.surveySlug
  }
  return { gql, variables }
}

module.exports = {
  get
}
