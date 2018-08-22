const { Redirect, NotFound } = require('@nudj/library/errors')
const { createEnumMap } = require('../../../lib')

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

const post = ({ body, params }) => {
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
              status
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
    let publishedMessage = ''
    if (
      variables.notifyTeam &&
      existingJob.status !== jobStatusMap.PUBLISHED &&
      updatedJob.status === jobStatusMap.PUBLISHED
    ) {
      publishedMessage = ' Your team have been notified.'
    }
    throw new Redirect({
      url: '/',
      notification: {
        type: 'success',
        message: `${updatedJob.title} published!${publishedMessage}`
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/jobs/${params.jobSlug}/bonus`,
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
