const { taskTypes } = require('../app/lib/constants')
const {
  HIRER_SURVEY,
  SEND_SURVEY_INTERNAL,
  SHARE_JOBS,
  UNLOCK_NETWORK_LINKEDIN
} = taskTypes

declare type CompanyOnboardedEvent = {
  id?: ID,
  company?: Company
}

declare type Company = {
  id?: ID,
  created?: string,
  modified?: string,
  description?: string,
  mission?: string,
  facebook?: string,
  industry?: string,
  jobs?: Array<Job>,
  linkedin?: string,
  location?: string,
  logo?: string,
  name?: string,
  size?: string,
  slug?: string,
  twitter?: string,
  url?: string,
  hirers?: Array<Hirer>,
  onboarded?: CompanyOnboardedEvent,
  tasks?: Array<Object>,
  surveys?: Array<Survey>
}

declare type CompanyTask = {
  id?: ID,
  type?: TaskType,
  company?: Company,
  completed?: boolean,
  completedBy?: Person
}

declare type TaskType = typeof HIRER_SURVEY
| typeof SEND_SURVEY_INTERNAL
| typeof SHARE_JOBS
| typeof UNLOCK_NETWORK_LINKEDIN
