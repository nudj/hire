const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async () => {
  const JobStatuses = await fetchEnums('JobStatus')

  const gql = `
    query (
      $status: JobStatus
    ) {
      user {
        hirer {
          company {
            jobs: jobsByFilters (
              filters: {
                status: $status
              }
            ) {
              id
              title
            }
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    status: JobStatuses.PUBLISHED
  }

  return { gql, variables }
}

const post = async ({ body, analytics }) => {
  const { job, firstName, lastName, email, consent, notes } = body
  const JobStatuses = await fetchEnums('JobStatus')

  const gql = `
    mutation CreateIntro (
      $jobId: ID!,
      $candidate: PersonCreateInput!,
      $notes: String,
      $status: JobStatus,
      $consent: Boolean!
    ) {
      user {
        hirer {
          company {
            name
            jobs: jobsByFilters (
              filters: {
                status: $status
              }
            ) {
              id
              title
            }
            job: jobByFilters(filters: { id: $jobId }) {
              id
              title
              intro: createIntro(candidate: $candidate, notes: $notes, consent: $consent) {
                id
                candidate {
                  firstName
                  lastName
                  email
                }
              }
            }
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    jobId: job,
    notes,
    consent,
    candidate: {
      firstName,
      lastName,
      email
    },
    status: JobStatuses.PUBLISHED
  }

  const transformData = data => {
    const { company } = data.user.hirer
    const { email, firstName, lastName } = company.job.intro.candidate

    analytics.track({
      object: analytics.objects.intro,
      action: analytics.actions.intro.created,
      properties: {
        jobTitle: company.job.title,
        companyName: company.name,
        candidateEmail: email,
        candidateName: `${firstName} ${lastName}`
      }
    })

    throw new Redirect({
      url: '/intros',
      notification: {
        type: 'success',
        message: 'New intro added 🎉'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: '/intros/new',
      notification: {
        type: 'error',
        message: 'Something went wrong while adding your intro! Please try again.'
      }
    })
  }

  return { gql, variables, transformData, catcher }
}

module.exports = {
  get,
  post
}
