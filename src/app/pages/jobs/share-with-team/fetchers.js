const { Redirect } = require('@nudj/library/errors')

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

const post = ({ body }) => {
  const gql = `
    mutation SendJobEmails ($jobs: [ID!]!, $recipients: [ID!]!) {
      user {
        id
        company {
          sendJobEmails(jobs: $jobs, recipients: $recipients) {
            success
          }
        }
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
  const variables = {
    jobs: body.jobs,
    recipients: body.recipients
  }

  const transformData = data => {
    if (data.user.company.sendJobEmails.success) {
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
