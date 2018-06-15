const { cookies } = require('@nudj/library')
const { Global } = require('../../lib/graphql')
const {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} = require('date-fns')

const formatServerDate = (date) => format(date, 'YYYY-MM-DD')

const get = ({ req, res, session, query }) => {
  const { period } = query

  const gql = `
    mutation GetJobsStatistics (
      $userId: ID!,
      $dateFrom: DateTime,
      $dateTo: DateTime
    ) {
      user {
        id
        firstName
        emailPreference
        connectionsCount
        created
        modified
        hirer {
          type
          id
          company {
            created
            modified
            hirers {
              id
              type
            }
            name
            slug
            jobs {
              id
              created
              modified
              title
              slug
              status
              location
              bonus
              referral: getOrCreateReferralForUser(person: $userId) {
                id
                slug
              }
              applicationCount: applicationsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              referralCount: referralsCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
              viewCount: viewCountByFilters(filters: { dateFrom: $dateFrom, dateTo: $dateTo})
            }
          }
        }
      }
      whatsappTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["whatsapp"])
      emailTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["email"])
      twitterTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["twitter"])
      linkedinTemplate: fetchTemplate(repo: "hirer", type: "share-job", tags: ["linkedin"])
      ${Global}
    }
  `

  // When not logged in variables fall back to a userId of 0 so that the above
  // fetcher does not 400 due to missing userId. There should never be a user
  // with id 0
  const variables = {
    userId: session.userId || 0
  }

  const now = new Date()

  if (period === 'week') {
    const dateFrom = startOfWeek(now, { weekStartsOn: 1 })
    const dateTo = endOfWeek(now, { weekStartsOn: 1 })

    variables.dateFrom = formatServerDate(dateFrom)
    variables.dateTo = formatServerDate(dateTo)
  } else if (period === 'month') {
    const dateFrom = startOfMonth(now)
    const dateTo = endOfMonth(now)

    variables.dateFrom = formatServerDate(dateFrom)
    variables.dateTo = formatServerDate(dateTo)
  }

  const transformData = data => {
    const newlyOnboarded = cookies.get(req, 'newlyOnboarded')
    const surveyRecentlyCompleted = cookies.get(req, 'surveyRecentlyCompleted')
    cookies.set(res, 'newlyOnboarded', false)
    cookies.set(res, 'surveyRecentlyCompleted', false)

    return {
      ...data,
      surveyRecentlyCompleted: surveyRecentlyCompleted === 'true',
      newlyOnboarded: newlyOnboarded === 'true'
    }
  }

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = {
  get
}
