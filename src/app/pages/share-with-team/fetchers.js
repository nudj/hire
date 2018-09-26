const { Redirect } = require('@nudj/library/errors')
const _get = require('lodash/get')

const get = () => {
  const gql = `
    query FetchTeam {
      user {
        id
        hirer {
          company {
            jobs {
              id
              title
              location
            }
            hirers {
              person {
                id
                firstName
                lastName
                email
                role {
                  name
                }
              }
              onboarded
            }
          }
        }
      }
    }
  `

  return { gql }
}

const getSuccessNotificationCopy = (recipients) => {
  if (recipients.length === 1) {
    return 'Message sent'
  }

  return 'Messages sent'
}

const post = ({ body, analytics }) => {
  const gql = `
    mutation SendJobEmails ($jobs: [ID!]!, $recipients: [ID!]!) {
      user {
        id
        hirer {
          company {
            sendJobEmails(jobs: $jobs, recipients: $recipients) {
              success
            }
            jobs {
              id
              title
              location
            }
            hirers {
              person {
                id
                firstName
                lastName
                email
                role {
                  name
                }
              }
              onboarded
            }
          }
        }
      }
    }
  `

  const variables = {
    jobs: body.jobs,
    recipients: body.recipients
  }

  const transformData = data => {
    if (_get(data, 'user.hirer.company.sendJobEmails.success')) {
      analytics.track({
        object: analytics.objects.job,
        action: analytics.actions.job.sharedInternally,
        properties: {
          jobCount: variables.jobs.length,
          receipientCount: variables.recipients.length,
          jobIds: variables.jobs,
          receipientIds: variables.recipients
        }
      })

      throw new Redirect({
        url: '/',
        notification: {
          type: 'success',
          message: getSuccessNotificationCopy(body.recipients)
        }
      })
    }

    return data
  }

  return {
    gql,
    variables,
    transformData
  }
}

module.exports = { get, post }
