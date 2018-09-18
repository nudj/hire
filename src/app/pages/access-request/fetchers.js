const { NotFound, Redirect } = require('@nudj/library/errors')
const { Global } = require('../../lib/graphql')

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
      ${Global}
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

const post = ({ params, analytics }) => {
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
          id
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
      ${Global}
    }
  `
  const variables = {
    accessRequestSlug
  }

  const transformData = data => {
    if (!data.accessRequest) throw new NotFound()

    analytics.track({
      object: analytics.objects.accessRequest,
      action: analytics.actions.accessRequest.accepted,
      properties: {
        slug: data.accessRequest.slug,
        acceptedBy: data.user.id,
        requestedBy: data.accessRequest.person.id
      }
    })

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
