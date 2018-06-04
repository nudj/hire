const { Redirect } = require('@nudj/framework/errors')
const {
  values: jobStatusTypes
} = require('@nudj/api/gql/schema/enums/job-status-types')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          company {
            id
          }
        }
      }
    }
  `

  return { gql }
}

const post = ({ body, res }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        hirer {
          company {
            id
            createJobAndOnboardHirer(data: $job) {
              id
            }
          }
        }
      }
    }
  `
  const variables = {
    job: {
      ...body,
      // Setting required defaults
      templateTags: [],
      status: jobStatusTypes.PUBLISHED,
      type: 'PERMANENT'
    }
  }
  const respond = () => {
    res.cookie('newlyOnboarded', true)
    throw new Redirect({
      url: '/'
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/setup-jobs',
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
