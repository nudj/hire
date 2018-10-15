const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            jobs {
              id
              title
            }
          }
        }
      }
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body, analytics }) => {
  const { job, firstName, lastName, email, notes } = body
  const gql = `
    mutation CreateIntro ($jobId: ID!, $candidate: PersonCreateInput!, $notes: String) {
      user {
        hirer {
          company {
            name
            jobs {
              id
              title
            }
            job: jobByFilters(filters: { id: $jobId }) {
              id
              title
              intro: createIntro(candidate: $candidate, notes: $notes) {
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
      notification: setNotification(type: "success", message: "Intro created!") {
        type
        message
      }
      ${Global}
    }
  `

  const variables = {
    jobId: job,
    notes,
    candidate: {
      firstName,
      lastName,
      email
    }
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

    return data
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
