const { Redirect } = require('@nudj/framework/errors')

const get = ({ params }) => {
  const gql = `
    query EditJob ($jobSlug: String!) {
      user {
        company {
          job: jobByFilters(filters: { slug: $jobSlug }) {
            title
            id
            slug
            status
            location
            description
            bonus
          }
        }
      }
    }
  `
  const variables = {
    jobSlug: params.jobSlug
  }

  return { gql, variables }
}

const post = ({ body, params, res }) => {
  const { id, ...data } = body
  const gql = `
    mutation updateJob ($id: ID!, $data: JobUpdateInput!) {
      user {
        company {
          job: updateJob(id: $id, data: $data) {
            title
            id
            slug
            status
            location
            description
            bonus
          }
        }
      }
    }
  `
  const variables = { id, data }
  const respond = () => {
    throw new Redirect({
      url: '/',
      notification: {
        type: 'success',
        message: `${body.title} updated! 🎉`
      }
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: `/jobs/${params.jobSlug}/edit`,
      notification: {
        type: 'error',
        message: 'Something went wrong while editing your job! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
