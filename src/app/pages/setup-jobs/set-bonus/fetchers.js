const { Redirect, NotFound } = require('@nudj/library/errors')

const get = ({ params }) => {
  const gql = `
    query jobBonus ($jobSlug: String!) {
      user {
        hirer {
          company {
            job: jobByFilters(filters: { slug: $jobSlug }) {
              id
              slug
            }
          }
        }
      }
    }
  `
  const variables = {
    jobSlug: params.jobSlug
  }

  return {
    gql,
    variables,
    transformData: (data) => {
      if (!data.user.hirer.company.job) throw new NotFound()
      return data
    }
  }
}

const post = ({ res, body, params }) => {
  const { id, bonus, status } = body

  const gql = `
    mutation updateJob ($jobId: ID!, $jobData: JobUpdateInput!) {
      user {
        hirer {
          company {
            job: updateJob(id: $jobId, data: $jobData) {
              id
              title
            }
          }
        }
      }
    }
  `

  const variables = {
    jobId: id,
    jobData: { bonus, status }
  }

  const respond = () => {
    throw new Redirect({
      url: '/'
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: `/setup-jobs/${params.jobSlug}/bonus`,
      notification: {
        type: 'error',
        message: 'Something went wrong setting the bonus! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
