const { Global } = require('../../lib/graphql')

const get = ({ params, session }) => {
  const gql = `
    query ($slug: String!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $slug }) {
              id
              slug
              introTitle
              introDescription
              status
              questions: surveyQuestions {
                id
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    slug: params.surveySlug
  }
  return { gql, variables }
}

module.exports = { get }
