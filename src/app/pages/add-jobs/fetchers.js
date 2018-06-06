const { Redirect } = require('@nudj/framework/errors')
const logger = require('@nudj/framework/logger')
const { intercom } = require('@nudj/library/analytics')
const {
  values: jobStatusTypes
} = require('@nudj/api/gql/schema/enums/job-status-types')

const { Global } = require('../../lib/graphql')

const triggerIntercomTracking = async (data, body) => {
  try {
    const user = await intercom.user.getBy({
      email: data.user.email
    })

    await intercom.user.logEvent({
      user,
      event: {
        name: 'added job',
        metadata: {
          title: body.title
        }
      }
    })
  } catch (error) {
    logger.log('error', error)
  }
}

const get = () => {
  const gql = `
    query {
      ${Global}
    }
  `

  return { gql }
}

const post = ({ body }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        email
        hirer {
          company {
            createJob(data: $job) {
              id
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
      description: '',
      templateTags: [],
      tags: [],
      status: jobStatusTypes.PUBLISHED,
      type: 'PERMANENT'
    }
  }
  const respond = data => {
    triggerIntercomTracking(data, body)

    throw new Redirect({
      url: '/',
      notification: {
        type: 'success',
        message: `${body.title} created! 🎉`
      }
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
