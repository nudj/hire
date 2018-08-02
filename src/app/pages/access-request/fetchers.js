const { NotFound, Redirect } = require('@nudj/library/errors')

const get = ({ params }) => {
  const gql = `
    query accessRequestPage (
      $accessRequestSlug: String!
    ) {
      user {
        id
      }
      accessRequest: accessRequestByFilters (
        filters: {
          slug: $accessRequestSlug
        }
      ) {
        slug
        person {
          firstName
          lastName
          email
        }
        company {
          name
        }
        acceptedBy {
          person {
            id
            firstName
            lastName
          }
        }
      }
    }
  `
  const variables = {
    accessRequestSlug: params.accessRequestSlug
  }

  const transformData = data => {
    if (!data.accessRequest) throw new NotFound()
    return data
  }

  return {
    gql,
    variables,
    transformData
  }
}

const post = ({ params }) => {
  const { accessRequestSlug } = params
  const gql = `
    mutation accessRequestPage (
      $accessRequestSlug: String!
    ) {
      user {
        id
      }
      accessRequest: accessRequestByFilters (
        filters: {
          slug: $accessRequestSlug
        }
      ) {
        person {
          firstName
          lastName
          email
        }
        company {
          name
        }
        accepted: accept
        acceptedBy {
          person {
            id
            firstName
            lastName
          }
        }
      }
    }
  `
  const variables = {
    accessRequestSlug
  }
  const transformData = data => {
    if (!data.accessRequest) throw new NotFound()
    return data
  }
  const catcher = error => {
    if (error.message === 'Request has already been accepted') {
      throw new Redirect({
        url: `/access-requests/${accessRequestSlug}`
      })
    }
    throw error
  }

  return {
    gql,
    variables,
    transformData,
    catcher
  }
}

module.exports = {
  get,
  post
}
