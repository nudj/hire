const { Redirect } = require('@nudj/library/errors')

const get = ({ query, params }) => {
  const gql = `
    query requestAccessPage ($slug: String!) {
      company: companyByFilters(filters: { slug: $slug }) {
        name
        slug
      }
    }
  `

  const variables = {
    slug: params.companySlug
  }

  return {
    gql,
    variables
  }
}

const post = ({ params, session }) => {
  const gql = `
    mutation requestAccess ($slug: String!, $personId: ID!) {
      company: companyByFilters(filters: { slug: $slug }) {
        createAccessRequest(person: $personId) {
          id
        }
      }
    }
  `
  const variables = {
    personId: session.userId,
    slug: params.companySlug
  }
  const respond = () => {
    throw new Redirect({
      url: `/request-access/${params.companySlug}/requested`
    })
  }

  return { gql, variables, respond }
}

module.exports = {
  get,
  post
}
