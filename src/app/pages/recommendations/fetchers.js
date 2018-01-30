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
            firstName
            lastName
            asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
              firstName
              lastName
            }
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
