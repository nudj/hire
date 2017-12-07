const { Global } = require('../../lib/graphql')

const get = ({ session, params }) => {
  const gql = `
    query SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      user (id: $userId) {
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

module.exports = {
  get
}
