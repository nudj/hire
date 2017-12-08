declare type Person = {
  id?: ID,
  company?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  status?: string,
  title?: string,
  type?: string,
  url?: string,
  hirer?: Hirer,
  formerEmployers?: Array<FormerEmployer>
}

declare type FormerEmployer = {
  id?: ID,
  name?: string,
  company?: Company,
  person?: Person,
  source?: string
}
