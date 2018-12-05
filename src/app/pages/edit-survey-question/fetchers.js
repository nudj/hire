const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')
const fetchEnums = require('../../lib/fetch-enums')

const get = async ({ params }) => {
  const gql = `
    query getSurvey ($surveySlug: String!, $questionSlug: String!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
              question: surveyQuestionByFilters(filters: { slug: $questionSlug }) {
                id
                slug
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
    questionSlug: params.questionSlug
  }

  return { gql, variables }
}

const getNew = async ({ params }) => {
  const gql = `
    query getNewSurveyQuestionPage ($surveySlug: String!) {
      user {
        hirer {
          company {
            id
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              id
              slug
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    surveySlug: params.surveySlug
  }

  return { gql, variables }
}

const post = async ({ body, params }) => {
  const { surveyQuestionTypes } = await fetchEnums({
    surveyQuestionTypes: 'SurveyQuestionType'
  })
  const gql = `
    mutation createSurvey ($surveySlug: String!, $data: SurveyQuestionCreateInput!) {
      user {
        hirer {
          company {
            survey: surveyByFilters(filters: { slug: $surveySlug }) {
              slug
              question: createSurveyQuestion(data: $data) {
                id
                slug
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    surveySlug: params.surveySlug,
    data: {
      ...body,
      required: false,
      type: surveyQuestionTypes.CONNECTIONS
    }
  }

  const transformData = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions`,
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
                slug
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
    surveyQuestionFilters: { slug: params.questionSlug },
    data: body
  }

  const transformData = ({ user }) => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/${user.hirer.company.survey.question.slug}`,
      notification: {
        type: 'info',
        message: 'Question updated'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/manage/surveys/${params.surveySlug}/questions/${params.questionSlug}`,
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
