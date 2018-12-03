const { Global } = require('../../lib/graphql')

const get = ({ params, session }) => {
  const gql = `
    query ($surveySlug: String!, $questionSlug: String!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
              question: surveyQuestionByFilters(filters: { slug: $questionSlug }) {
                id
                slug
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
    questionSlug: params.questionSlug
  }
  return { gql, variables }
}

module.exports = { get }
