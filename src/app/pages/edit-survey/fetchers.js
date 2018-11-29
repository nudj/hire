const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../../lib')

const get = async ({ params }) => {
  const gql = `
    query getSurvey ($slug: String!) {
      surveyStatuses: __type(name: "SurveyStatus") {
        values: enumValues {
          name
        }
      }
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $slug }) {
              id
              introTitle
              introDescription
              slug
              status
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    slug: params.surveySlug
  }
  const transformData = data => {
    data.surveyStatuses = createEnumMap(data.surveyStatuses.values)
    return data
  }

  return { gql, variables, transformData }
}

const getNew = async () => {
  const gql = `
    query {
      surveyStatuses: __type(name: "SurveyStatus") {
        values: enumValues {
          name
        }
      }
      user {
        hirer {
          company {
            id
          }
        }
      }
      ${Global}
    }
  `
  const transformData = data => {
    data.surveyStatuses = createEnumMap(data.surveyStatuses.values)
    return data
  }

  return { gql, transformData }
}

const post = async ({ body }) => {
  const gql = `
    mutation createSurvey ($data: SurveyCreateInput!) {
      user {
        hirer {
          company {
            survey: createSurvey(data: $data) {
              id
            }
          }
        }
      }
    }
  `

  const variables = {
    data: body
  }

  const transformData = () => {
    throw new Redirect({
      url: '/manage/surveys',
      notification: {
        type: 'success',
        message: 'New survey created!'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: '/manage/surveys/new',
      notification: {
        type: 'error',
        message: 'Something went wrong while adding your intro! Please try again.'
      }
    })
  }

  return { gql, variables, transformData, catcher }
}

const patch = async ({ body, params }) => {
  const slug = params.surveySlug
  const gql = `
    mutation updateSurvey ($filters: SurveyFilterInput!, $data: SurveyUpdateInput!) {
      user {
        hirer {
          company {
            survey: updateSurveyByFilters(filters: $filters, data: $data) {
              id
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    filters: { slug },
    data: body
  }

  const transformData = () => {
    throw new Redirect({
      url: `/manage/surveys/${slug}`,
      notification: {
        type: 'info',
        message: 'Survey updated'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/manage/surveys/${slug}`,
      notification: {
        type: 'error',
        message: 'Something went wrong while updating the survey! Please try again.'
      }
    })
  }

  return { gql, variables, transformData, catcher }
}

module.exports = {
  getNew,
  get,
  post,
  patch
}
