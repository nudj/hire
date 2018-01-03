declare type ConnectionSource = {
  id?: ID,
  created?: string,
  modified?: string,
  name?: string
}

declare type Connection = {
  id?: ID,
  title?: string,
  email?: string,
  created?: string,
  modified?: string,
  firstName: string,
  lastName?: string,
  from?: Person,
  person?: Person,
  role?: Role,
  company?: Company,
  source?: ConnectionSource
}
