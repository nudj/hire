const { values: emailPreferences } = require('@nudj/api/gql/schema/enums/email-preference-types')

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

const GOOGLE_MAILER_DAEMON_ADDRESS = 'mailer-daemon@googlemail.com'

module.exports = {
  surveyTypes,
  taskTypes,
  notificationTypes,
  booleanChoices,
  emailPreferences,
  questionTypes,
  GOOGLE_MAILER_DAEMON_ADDRESS
}
