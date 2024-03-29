const toUpper = require('lodash/toUpper')
const _get = require('lodash/get')
const { Redirect, NotFound } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')
const { dataSources, questionTypes } = require('../../lib/constants')
const { createEnumMap } = require('../../lib')
const { getNextSurveyUri } = require('./helpers')

async function fetchQuestionType ({ requestGQL, params }) {
  const { question, surveyStatusTypes } = await requestGQL({
    gql: `
      query getQuestion ($id: ID!) {
        surveyStatusTypes: __type(name: "SurveyStatus") {
          values: enumValues {
            name
          }
        }
        question: surveyQuestion (id: $id) {
          type
          survey {
            status
          }
        }
      }
    `,
    variables: { id: params.questionId }
  })

  const surveyStatuses = createEnumMap(surveyStatusTypes.values)
  if (question.survey.status !== surveyStatuses.PUBLISHED) {
    throw new NotFound({ log: [`User attempted to access a survey of status "${question.survey.status}"`] })
  }

  return question.type
}

const get = async data => {
  const questionType = await fetchQuestionType(data)

  switch (toUpper(questionType)) {
    case questionTypes.COMPANIES:
      return getCompaniesQuestion(data)
    case questionTypes.CONNECTIONS:
      return getConnectionsQuestion(data)
  }
}

const post = async data => {
  const questionType = await fetchQuestionType(data)

  switch (toUpper(questionType)) {
    case questionTypes.COMPANIES:
      return postEmployment(data)
    case questionTypes.CONNECTIONS:
      return postConnectionAnswer(data)
  }
}

const getCompaniesQuestion = ({ params, query }) => {
  const gql = `
    query CompaniesQuestionPage (
      $surveySlug: String!,
      $questionId: ID!
    ) {
      user {
        employments {
          id
          company {
            id
            name
          }
          source
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              questions: surveyQuestions {
                id
                type
              }
              question: surveyQuestionByFilters (filters: {
                id: $questionId
              }) {
                id
                slug
                title
                description
                type
                required
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

const getConnectionsQuestion = ({ session, params, query }) => {
  const gql = `
    query ConnectionSurveyQuestion(
      $userId: ID!,
      $search: String!
      $surveySlug: String!,
      $questionId: ID!
    ) {
      user {
        connectionsCount
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              questions: surveyQuestions {
                id
                type
              }
              question: surveyQuestionByFilters (filters: {
                id: $questionId
              }) {
                id
                slug
                title
                description
                type
                required
              }
            }
          }
        }
        results: searchConnections(query: $search) {
          connections {
            id
            firstName
            lastName
            role {
              name
            }
            company {
              name
            }
            person {
              id
              email
            }
            source
            tags {
              id
              type
              name
            }
          }
        }
      }
      surveyAnswers: surveyAnswersByFilters(filters: { person: $userId }) {
        connections {
          id
          firstName
          lastName
        }
        surveyQuestion {
          id
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    surveySlug: params.surveySlug,
    questionId: params.questionId,
    search: query.search || ''
  }

  return { gql, variables }
}

const postEmployment = ({ params, body }) => {
  const gql = `
    mutation AddEmployment (
      $surveySlug: String,
      $questionId: ID!,
      $company: String!,
      $current: Boolean!,
      $source: DataSource!
    ) {
      notification: setNotification (type: "success", message: "Company added") {
        type
        message
      }
      user {
        newEmployment: getOrCreateEmployment (
          company: $company,
          current: $current,
          source: $source
        ) {
          id
          company {
            id
            name
          }
          source
        }
        employments {
          id
          company {
            id
            name
          }
          source
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              questions: surveyQuestions {
                id
                type
              }
              question: surveyQuestionByFilters (filters: {
                id: $questionId
              }) {
                id
                slug
                title
                description
                type
                required
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
    questionId: params.questionId,
    company: body.employment,
    source: body.source,
    current: false
  }
  return { gql, variables }
}

const postConnectionAnswer = ({ session, params, body }) => {
  const gql = `
    mutation createSurveyAnswer (
      $connections: [ID!]!
      $userId: ID!
      $questionId: ID!,
      $surveySlug: String!,
    ) {
      storeSurveyAnswer (
        surveyQuestion: $questionId
        person: $userId
        connections: $connections
      ) {
        id
      }
      user {
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              questions: surveyQuestions {
                id
                type
              }
              question: surveyQuestionByFilters (filters: {
                id: $questionId
              }) {
                id
                slug
                title
                description
                type
                required
              }
            }
          }
        }
      }
      ${Global}
    }
  `

  const variables = {
    userId: session.userId,
    questionId: params.questionId,
    surveySlug: params.surveySlug,
    connections: body.connections
  }

  const respond = (data) => {
    const redirectUrl = getNextSurveyUri(_get(data, 'user.hirer.company.survey', {}))

    throw new Redirect({
      url: redirectUrl
    })
  }

  return { gql, variables, respond }
}

const postNewConnection = ({ params, body }) => {
  const gql = `
    mutation addNewConnection (
      $firstName: String!
      $lastName: String!
      $email: String!
      $title: String
      $company: String
      $source: DataSource!
    ) {
      user {
        newConnection: getOrCreateConnection (
          to: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            title: $title,
            company: $company
          }
          source: $source
        ) {
          id
          firstName
          lastName
        }
      }
      ${Global}
    }
  `
  const variables = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    title: body.title,
    company: body.company,
    source: dataSources.MANUAL
  }
  return { gql, variables }
}

module.exports = {
  get,
  post,
  postNewConnection
}
