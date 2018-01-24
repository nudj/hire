const { Global } = require('../../lib/graphql')

const get = ({ session }) => {
  const gql = `
    query SurveysPage($userId: ID!) {
      surveyAnswers: surveyAnswersByFilters(filters: {person: $userId}) {
        id
        surveyQuestion {
          surveySection {
            survey {
              slug
              introTitle
            }
          }
        }
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
      ${Global}
    }
  `

  const variables = {
    userId: session.userId
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
