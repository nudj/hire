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
  TEXT: 'TEXT',
  FREETEXT: 'FREETEXT',
  CHOICE: 'CHOICE',
  MULTICHOICE: 'MULTICHOICE'
}

module.exports = {
  surveyTypes,
  notificationTypes,
  booleanChoices,
  questionTypes
}
