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

const post = ({ body }) => {
  const gql = `
    mutation CreateJob ($job: JobCreateInput!) {
      user {
        hirer {
          company {
            id
            createJob(data: $job) {
              id
            }
          }
        }
      }
      notification: setNotification (type: "success", message: "Job created! 🎉") {
        type
        message
      }
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
  const catcher = () => {
    throw new Redirect({
      url: '/setup-company',
      notification: {
        type: 'error',
        message: 'Something went wrong while adding your job! Please try again.'
      }
    })
  }

  return { gql, variables, catcher }
}

const postOnboarding = ({ body, res }) => {
  const { companyId } = body
  const gql = `
    mutation SetCompany ($companyId: ID!, $companyUpdate: CompanyUpdateInput!) {
      updateCompany(
        id: $companyId,
        companyUpdate: $companyUpdate
      ) {
        id
        name
        onboarded
      }
      user {
        hirer {
          setOnboarded
        }
      }
      newlyOnboarded: companies {
        id
      }
    }
  `
  const variables = {
    companyId,
    companyUpdate: {
      onboarded: true
    }
  }
  const respond = () => {
    throw new Redirect({
      url: '/'
    })
  }

  res.cookie('newlyOnboarded', true)

  return { gql, variables, respond }
}

module.exports = {
  get,
  post,
  postOnboarding
}
