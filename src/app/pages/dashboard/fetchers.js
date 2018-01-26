const { Global } = require('../../lib/graphql')
const { parse, format } = require('date-fns')

const get = ({ session, query }) => {
  const gql = `
    query GetDashboardStatistics($userId: ID!, $dateFrom: DateTime, $dateTo: DateTime) {
      user(id: $userId) {
        hirer {
          company {
            slug
            jobs {
              id
              title
              slug
              location
              applicationCount: applicationsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              referralCount: referralsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              viewCount: viewCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
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

  if (query.startDate) variables.dateFrom = format(parse(query.startDate))
  if (query.endDate) variables.dateTo = format(parse(query.endDate))

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
