declare module StyleFile {
  declare var exports: () => {}
}

declare type ID = string | number

declare type Hirer = {
  onboarded: boolean
}

declare type User = {
  company?: string,
  created: Date,
  email?: string,
  firstName?: string,
  id: ID,
  lastName?: string,
  status?: string,
  title?: string,
  type?: string,
  modified: Date,
  url?: string,
  applications?: Array<mixed>,
  externalMessages?: Array<mixed>,
  hirer: Hirer,
  recommendations?: Array<mixed>,
  referrals?: Array<mixed>,
  tasks?: Array<mixed>,
  incompleteTaskCount?: number,
  connections?: Array<mixed>,
  formerEmployers?: Array<mixed>
}
