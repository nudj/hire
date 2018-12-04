const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async ({ requestGQL }) => {
  const { surveyStatusTypes } = await fetchEnums({
    surveyStatusTypes: 'SurveyStatus'
  })

  const gql = `
    query (
      $surveyStatus: SurveyStatus!
    ) {
      user {
        hirer {
          company {
            surveys: surveysByFilters (
              filters: {
                status: $surveyStatus
              }
            ) {
              id
              slug
              introTitle
              status
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveyStatus: surveyStatusTypes.PUBLISHED
  }

  return { gql, variables }
}

module.exports = {
  get
}
