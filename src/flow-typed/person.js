declare type Hirer = {
  id?: ID,
  company?: Company,
  person?: Person,
  onboarded?: HirerOnboardedEvent
}

declare type HirerOnboardedEvent = {
  id?: ID,
  hirer?: Hirer
}
