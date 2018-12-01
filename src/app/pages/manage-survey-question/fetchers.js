const { Global } = require('../../lib/graphql')

const get = ({ params, session }) => {
  const gql = `
    query ($surveySlug: String!, $questionId: ID!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
              question: surveyQuestionByFilters(filters: { id: $questionId }) {
                id
                title
                description
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug: params.surveySlug,
    questionId: params.questionId
  }
  return { gql, variables }
}

module.exports = { get }
