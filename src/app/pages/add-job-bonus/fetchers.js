const { Redirect, NotFound } = require('@nudj/library/errors')
const { createEnumMap } = require('../../lib')
const { Global } = require('../../lib/graphql')

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
      ${Global}
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

const post = ({ body, params, analytics, requestGQL }) => {
  const { id, bonus, status } = body

  const gql = `
    query updateJob (
      $jobId: ID!
      $jobData: JobUpdateInput!
      $notifyTeam: Boolean
    ) {
      user {
        hirer {
          company {
            updateJob(
              id: $jobId
              data: $jobData
              notifyTeam: $notifyTeam
            ) {
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
      job (id: $jobId) {
        status
      }
      jobStatusTypes: __type(name: "JobStatus") {
        values: enumValues {
          name
        }
      }
    }
  `

  const variables = {
    jobId: id,
    jobData: { bonus, status },
    notifyTeam: true
  }

  const respond = data => {
    const existingJob = data.job
    const updatedJob = data.user.hirer.company.updateJob
    const jobStatusMap = createEnumMap(data.jobStatusTypes.values)
    const notifyTeam = (
      variables.notifyTeam &&
      existingJob.status !== jobStatusMap.PUBLISHED &&
      updatedJob.status === jobStatusMap.PUBLISHED
    )

    const notification = notifyTeam
      ? `${updatedJob.title} published! Your team have been notified.`
      : `${updatedJob.title} published!`

    analytics.track({
      object: analytics.objects.job,
      action: analytics.actions.job.edited,
      properties: {
        jobTitle: updatedJob.title,
        jobSlug: updatedJob.slug,
        jobStatus: updatedJob.status,
        jobLocation: updatedJob.location,
        jobBonus: updatedJob.bonus,
        jobCreated: updatedJob.created,
        jobModified: updatedJob.modified
      }
    })

    throw new Redirect({
      url: '/',
      notification: {
        type: 'success',
        message: notification
      }
    })
  }

  const catcher = async () => {
    const { job } = await requestGQL({
      gql: `
        query fetchJob ($jobId: ID!) {
          job(id: $jobId) {
            slug
          }
        }
      `,
      variables: { jobId: id }
    })
    throw new Redirect({
      url: `/jobs/${job.slug}/bonus`,
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
