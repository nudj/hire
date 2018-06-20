const { Redirect } = require('@nudj/framework/errors')
const { logNewJobToIntercom } = require('../../lib/intercom')
const {
  values: jobStatusTypes
} = require('@nudj/api/gql/schema/enums/job-status-types')

const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        email
        hirer {
          company {
            createJob(data: $job) {
              id
              slug
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    job: {
      ...body,
      // Setting required defaults
      templateTags: [],
      tags: [],
      status: jobStatusTypes.DRAFT,
      type: 'PERMANENT'
    }
  }
  const respond = data => {
    logNewJobToIntercom(data, body)
    const { slug } = data.user.hirer.company.createJob

    throw new Redirect({
      url: `/jobs/set-bonus/${slug}`,
      notification: {
        type: 'success',
        message: `${body.title} created! 🎉`
      }
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/jobs/new',
      notification: {
        type: 'error',
        message: 'Something went wrong while adding your job! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
