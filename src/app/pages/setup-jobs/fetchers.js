const { cookies } = require('@nudj/library')
const { Redirect } = require('@nudj/framework/errors')
const {
  values: jobStatusTypes
} = require('@nudj/api/gql/schema/enums/job-status-types')

const { logNewJobToIntercom } = require('../../lib/intercom')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            id
          }
        }
      }
      ${Global}
    }
  `

  return { gql }
}

const post = ({ res, body }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        email
        hirer {
          company {
            id
            name
            job: createJob(data: $job) {
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
      status: jobStatusTypes.DRAFT,
      type: 'PERMANENT'
    }
  }
  const respond = data => {
    logNewJobToIntercom(data, body)
    const { slug } = data.user.hirer.company.job
    cookies.set(res, 'newlyOnboarded', true)

    throw new Redirect({
      url: `/setup-jobs/${slug}/bonus`
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/setup-jobs',
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
