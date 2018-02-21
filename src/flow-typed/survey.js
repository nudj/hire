const { questionTypes } = require('../app/lib/constants')
const { COMPANIES, CONNECTIONS } = questionTypes

declare type SurveyQuestionType = typeof COMPANIES | typeof CONNECTIONS

declare type Survey = {
  id?: ID,
  company?: Company,
  slug?: string,
  introTitle?: string,
  introDescription?: string,
  outroTitle?: string,
  outroDescription?: string,
  surveySections?: Array<SurveySection>
}

declare type SurveySection = {
  id?: ID,
  survey?: Survey,
  title?: string,
  description?: string,
  surveyQuestions?: Array<SurveyQuestion>
}

declare type SurveyQuestion = {
  id?: ID,
  surveySection?: SurveySection,
  title?: string,
  description?: string,
  name?: string,
  type?: SurveyQuestionType,
  required?: boolean
}

declare type SurveyAnswer = {
  id?: ID,
  surveyQuestion?: SurveyQuestion,
  person?: Person,
  connections?: Array<Connection>
}
