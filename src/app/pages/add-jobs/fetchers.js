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

const post = ({ body, analytics }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        email
        hirer {
          company {
            createJob(data: $job) {
              id
              title
              slug
              created
              modified
              status
              location
              bonus
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
    const {
      title,
      slug,
      created,
      modified,
      status,
      location,
      bonus
    } = data.user.hirer.company.createJob

    analytics.track({
      object: analytics.objects.job,
      action: analytics.actions.job.created,
      properties: {
        jobTitle: title,
        jobSlug: slug,
        jobStatus: status,
        jobLocation: location,
        jobBonus: bonus,
        jobCreated: created,
        jobModified: modified
      }
    })

    throw new Redirect({
      url: `/jobs/${slug}/bonus`
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
