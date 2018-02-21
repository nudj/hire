const { values: jobStatuses } = require('@nudj/api/gql/schema/enums/job-status-types')
const { Global } = require('../../lib/graphql')
const {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addWeeks,
  addMonths
} = require('date-fns')

const formatServerDate = (date) => format(date, 'YYYY-MM-DD')

const get = ({ session, query }) => {
  const { period } = query

  const gql = `
    query GetDashboardStatistics(
      $userId: ID!,
      $dateFrom: DateTime,
      $dateTo: DateTime,
      $pastDateFrom: DateTime,
      $pastDateTo: DateTime,
      $jobStatus: JobStatus
    ) {
      user(id: $userId) {
        hirer {
          company {
            slug
            jobs: jobsByFilters (filters: { status: $jobStatus }) {
              id
              title
              slug
              location
              applicationCount: applicationsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              referralCount: referralsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              viewCount: viewCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              pastApplicationCount: applicationsCountByFilters(filters: { dateFrom: $pastDateFrom, dateTo: $pastDateTo})
              pastReferralCount: referralsCountByFilters(filters: { dateFrom: $pastDateFrom, dateTo: $pastDateTo})
              pastViewCount: viewCountByFilters(filters: { dateFrom: $pastDateFrom, dateTo: $pastDateTo})
            }
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    jobStatus: jobStatuses.PUBLISHED
  }

  const now = new Date()

  if (period === 'week') {
    const dateFrom = startOfWeek(now, { weekStartsOn: 1 })
    const dateTo = endOfWeek(now, { weekStartsOn: 1 })
    const pastDateFrom = addWeeks(dateFrom, -1)
    const pastDateTo = addWeeks(dateTo, -1)

    variables.dateFrom = formatServerDate(dateFrom)
    variables.dateTo = formatServerDate(dateTo)
    variables.pastDateFrom = formatServerDate(pastDateFrom)
    variables.pastDateTo = formatServerDate(pastDateTo)
  } else if (period === 'month') {
    const dateFrom = startOfMonth(now)
    const dateTo = endOfMonth(now)
    const pastDateFrom = addMonths(dateFrom, -1)
    const pastDateTo = addMonths(dateTo, -1)

    variables.dateFrom = formatServerDate(dateFrom)
    variables.dateTo = formatServerDate(dateTo)
    variables.pastDateFrom = formatServerDate(pastDateFrom)
    variables.pastDateTo = formatServerDate(pastDateTo)
  }

  return {
    gql,
    variables
  }
}

module.exports = {
  get
}
