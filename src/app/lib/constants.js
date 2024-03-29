const { values: emailPreferences } = require('@nudj/api/gql/schema/enums/email-preference-types')
const { values: dataSources } = require('@nudj/api/gql/schema/enums/data-sources')
const { values: jobStatuses } = require('@nudj/api/gql/schema/enums/job-status-types')
const { values: expertiseTags } = require('@nudj/api/gql/schema/enums/expertise-tags')
const { values: memberTypes } = require('@nudj/api/gql/schema/enums/hirer-types')

const surveyTypes = {
  EMPLOYEE_SURVEY: 'EMPLOYEE_SURVEY',
  HIRER_SURVEY: 'HIRER_SURVEY'
}
const notificationTypes = [
  'success',
  'info',
  'warn',
  'error'
]
const booleanChoices = {
  YES: 'YES',
  NO: 'NO'
}
const questionTypes = {
  COMPANIES: 'COMPANIES',
  CONNECTIONS: 'CONNECTIONS'
}
const taskTypes = {
  HIRER_SURVEY: 'HIRER_SURVEY',
  SEND_SURVEY_INTERNAL: 'SEND_SURVEY_INTERNAL',
  SHARE_JOBS: 'SHARE_JOBS',
  UNLOCK_NETWORK_LINKEDIN: 'UNLOCK_NETWORK_LINKEDIN'
}

const currencyKeys = {
  GBP: 'GBP',
  USD: 'USD',
  EUR: 'EUR',
  CUSTOM: 'CUSTOM'
}

const currencies = {
  [currencyKeys.GBP]: {
    symbol: '£',
    icon: 'poundBold'
  },
  [currencyKeys.USD]: {
    symbol: '$',
    icon: 'dollarBold'
  },
  [currencyKeys.EUR]: {
    symbol: '€',
    icon: 'euroBold'
  },
  [currencyKeys.CUSTOM]: {
    symbol: null,
    icon: 'moreVert'
  }
}

const GOOGLE_MAILER_DAEMON_ADDRESS = 'mailer-daemon@googlemail.com'

module.exports = {
  emailPreferences,
  dataSources,
  jobStatuses,
  expertiseTags,
  memberTypes,

  surveyTypes,
  notificationTypes,
  booleanChoices,
  questionTypes,
  taskTypes,

  currencies,
  currencyKeys,

  GOOGLE_MAILER_DAEMON_ADDRESS
}
