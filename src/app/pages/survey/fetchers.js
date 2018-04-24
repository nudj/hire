const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query SurveyPage ($surveySlug: String) {
      user {
        hirer {
          company {
            name
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              introTitle
              introDescription
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
    surveySlug: params.surveySlug
  }
  return { gql, variables }
}

module.exports = {
  get
}
