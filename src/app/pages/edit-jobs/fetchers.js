const { Redirect } = require('@nudj/framework/errors')
const { createEnumMap } = require('../../lib')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query EditJob ($jobSlug: String!) {
      user {
        hirer {
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
      jobStatusTypes: __type(name: "JobStatus") {
        values: enumValues {
          name
        }
      }
      ${Global}
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
    query updateJob (
      $id: ID!
      $data: JobUpdateInput!
      $notifyTeam: Boolean
    ) {
      user {
        hirer {
          company {
            job: updateJob(
              id: $id
              data: $data
              notifyTeam: $notifyTeam
            ) {
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
      job (id: $id) {
        status
      }
      jobStatusTypes: __type(name: "JobStatus") {
        values: enumValues {
          name
        }
      }
      ${Global}
    }
  `
  const variables = { id, data, notifyTeam: true }
  const respond = data => {
    const existingJob = data.job
    const updatedJob = data.user.hirer.company.job
    const jobStatusMap = createEnumMap(data.jobStatusTypes.values)
    const statusHasChanged = existingJob.status !== updatedJob.status
    const actionPerformed = statusHasChanged ? jobStatusMap[updatedJob.status].toLowerCase() : 'updated'
    const hasBeenPublished = actionPerformed === jobStatusMap.PUBLISHED.toLowerCase()

    let publishedMessage = ''
    if (
      variables.notifyTeam &&
      statusHasChanged &&
      updatedJob.status === jobStatusMap.PUBLISHED
    ) {
      publishedMessage = ' Your team have been notified.'
    }

    throw new Redirect({
      url: '/',
      notification: {
        type: statusHasChanged && hasBeenPublished ? 'success' : 'info',
        message: `${updatedJob.title} ${actionPerformed}!${publishedMessage}`
      }
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: `/jobs/${params.jobSlug}/edit`,
      notification: {
        type: 'error',
        message: 'Something went wrong while updating your job! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  post
}
