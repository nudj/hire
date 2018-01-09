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
  employments?: Array<Employment>
}

declare type Employment = {
  id?: ID,
  name?: string,
  company?: Company,
  person?: Person,
  source?: string
}
