const _get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')

const { createNotification } = require('../../lib')
const { Global } = require('../../lib/graphql')

const hasActiveJobs = (data) => {
  const jobs = _get(data, 'user.hirer.company.jobs', [])

  if (jobs.length) return data

  throw new Redirect({
    url: '/contacts',
    notification: createNotification(
      'info',
      'To message someone, please publish a job'
    )
  })
}

const get = props => {
  const { session, params } = props
  const gql = `
    query GetJobs(
      $userId: ID!,
      $recipientId: ID!,
      $status: JobStatus
    ) {
      user {
        hirer {
          company {
            id
            jobs: jobsByFilters(filters: { status: $status }) {
              id
              title
              status
            }
          }
        }
      }
      recipient: person(id: $recipientId) {
        firstName
        lastName
        asAConnection: asAConnectionByFilters(filters: { from: $userId }) {
          firstName
          lastName
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    recipientId: params.recipientId,
    status: 'PUBLISHED'
  }

  return {
    gql,
    variables,
    transformData: hasActiveJobs
  }
}

module.exports = {
  get
}
