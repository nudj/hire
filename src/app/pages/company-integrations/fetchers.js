const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async () => {
  const { integrationTypes } = await fetchEnums({ integrationTypes: 'CompanyIntegrationType' })
  const gql = `
    query {
      user {
        hirer {
          company {
            id
            integrations {
              id
              type
            }
          }
        }
      }
      ${Global}
    }
  `
  const transformData = data => {
    data.integrationTypes = integrationTypes

    return data
  }

  return { gql, transformData }
}

module.exports = {
  get
}
