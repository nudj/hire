const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = async ({ params }) => {
  const gql = `
    query getSurvey ($surveySlug: String!, $questionId: ID!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
              question: surveyQuestionByFilters(filters: { id: $questionId }) {
                id
                title
                description
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug: params.surveySlug,
    questionId: params.questionId
  }

  return { gql, variables }
}

const getNew = async () => {
  const gql = `
    query {
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

  return { gql }
}

const post = async ({ body, params }) => {
  const gql = `
    mutation createSurvey ($surveySlug: String!, $data: SurveyQuestionCreateInput!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              slug
              question: createSurveyQuestion(data: $data) {
                id
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    surveySlug: params.surveySlug,
    data: body
  }

  const transformData = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/${params.questionId}`,
      notification: {
        type: 'success',
        message: 'New question created!'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/new`,
      notification: {
        type: 'error',
        message: 'Something went wrong while adding your intro! Please try again.'
      }
    })
  }

  return { gql, variables, transformData, catcher }
}

const patch = async ({ body, params }) => {
  const gql = `
    mutation updateSurveyQuestions ($surveyFilters: SurveyFilterInput!, $surveyQuestionFilters: SurveyQuestionFilterInput!, $data: SurveyQuestionUpdateInput!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: $surveyFilters) {
              id
              question: updateSurveyQuestionByFilters(filters: $surveyQuestionFilters, data: $data) {
                id
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveyFilters: { slug: params.surveySlug },
    surveyQuestionFilters: { id: params.questionId },
    data: body
  }

  const transformData = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/${params.questionId}`,
      notification: {
        type: 'info',
        message: 'Question updated'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/${params.questionId}`,
      notification: {
        type: 'error',
        message: 'Something went wrong while updating the question! Please try again.'
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
