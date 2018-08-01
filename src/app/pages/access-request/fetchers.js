const { NotFound } = require('@nudj/library/errors')

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
    accessRequestSlug: params.accessRequestSlug
  }

  const transformData = data => {
    if (!data.accessRequest) throw new NotFound()
    if (!data.accessRequest.accepted) {
      // In the case where multiple people click the email link at the same time, setting up race conditions, only the first person to click accept is credited with the acceptance. The others should not receive an error as the action they executed has effectively already been completed.
      if (!data.accessRequest.acceptedBy) {
        // This code should only be reached when the acceptance genuinely fails and no one else has accepted in parallel.
        data.notification = {
          type: 'error',
          message: 'The acceptance failed, please try again'
        }
      }
    }
    return data
  }

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = {
  get,
  post
}
