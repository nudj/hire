const { Global } = require('../../lib/graphql')

const get = ({ session, params }) => {
  const gql = `
    query SurveySectionPage (
      $userId: ID!,
      $surveySlug: String,
      $sectionId: ID!
      ) {
      user (id: $userId) {
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              sections: surveySections {
                id
                questions: surveyQuestions {
                  id
                  type
                }
              }
              section: surveySectionById (id: $sectionId) {
                id
                title
                description
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
    sectionId: params.sectionId
  }
  return { gql, variables }
}

module.exports = {
  get
}
