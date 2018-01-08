const { Global } = require('../../lib/graphql')

const get = ({ session, params }) => {
  const gql = `
    mutation SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      surveyAnswer: surveyAnswerByFilters (filters: {
        person: "person5"
        surveyQuestion: "question2"
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
          source {
            name
          }
          person {
            id
            email
          }
        }
      }
      user (id: $userId) {
        hirer {
          company {
            survey: surveyByFilters (filters: {
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
    surveySlug: params.surveySlug
  }
  return { gql, variables }
}

module.exports = {
  get
}
