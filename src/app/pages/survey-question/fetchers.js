const toUpper = require('lodash/toUpper')
const isNil = require('lodash/isNil')
const { Redirect } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')
const { questionTypes } = require('../../lib/constants')

const getQuestion = data => {
  switch (toUpper(data.params.questionType)) {
    case questionTypes.COMPANIES:
      return getCompaniesQuestion(data)
    case questionTypes.CONNECTIONS:
      return getConnectionsQuestion(data)
  }
}

const getCompaniesQuestion = ({ session, params, query }) => {
  const gql = `
    query CompaniesQuestionPage (
      $userId: ID!,
      $surveySlug: String!,
      $sectionId: ID!,
      $questionId: ID!
    ) {
      user (id: $userId) {
        employments {
          id
          source {
            id
            name
          }
          company {
            id
            name
          }
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              sections: surveySections {
                id
                questions: surveyQuestions {
                  id
                  type
                }
              }
              section: surveySectionByFilters (
                filters: {
                  id: $sectionId
                }
              ) {
                id
                questions: surveyQuestions {
                  id
                  type
                }
                question: surveyQuestionByFilters (
                  filters: {
                    id: $questionId
                  }
                ) {
                  id
                  title
                  description
                  name
                  type
                  required
                }
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
    surveySlug: params.surveySlug,
    sectionId: params.sectionId,
    questionId: params.questionId
  }
  return { gql, variables }
}

const getConnectionsQuestion = ({ session, params, query }) => {
  const hirerFragment = `
    hirer {
      company {
        survey: surveyByFilters (filters: {
          slug: $surveySlug
        }) {
          id
          slug
          sections: surveySections {
            id
            questions: surveyQuestions {
              id
              type
            }
          }
          section: surveySectionByFilters (
            filters: {
              id: $sectionId
            }
          ) {
            id
            questions: surveyQuestions {
              id
              type
            }
            question: surveyQuestionByFilters (
              filters: {
                id: $questionId
              }
            ) {
              id
              title
              description
              name
              type
              required
            }
          }
        }
      }
    }
  `
  let gql = `
    query SurveyQuestionPage (
      $userId: ID!,
      $surveySlug: String!,
      $sectionId: ID!,
      $questionId: ID!,
    ) {
      user (id: $userId) {
        ${hirerFragment}
      }
      ${Global}
    }
  `
  if (!isNil(query.search)) {
    gql = `
      query SurveyQuestionPage (
        $userId: ID!,
        $surveySlug: String!,
        $sectionId: ID!,
        $questionId: ID!,
        $search: String!,
        $fields: [[String!]!]!
      ) {
        user (id: $userId) {
          connections: searchConnections(query: $search, fields: $fields) {
            id
            firstName
            lastName
            role {
              name
            }
            company {
              name
            }
            source {
              name
            }
            person {
              id
              email
            }
          }
          ${hirerFragment}
        }
        ${Global}
      }
    `
  }
  const variables = {
    userId: session.userId,
    surveySlug: params.surveySlug,
    sectionId: params.sectionId,
    questionId: params.questionId,
    search: query.search,
    fields: [['firstName', 'lastName']]
  }
  return { gql, variables }
}

const postEmployment = ({ session, params, body }) => {
  const gql = `
    mutation AddEmployment (
      $userId: ID!,
      $surveySlug: String,
      $sectionId: ID!,
      $questionId: ID!,
      $company: String!,
      $source: String!
    ) {
      user (id: $userId) {
        newEmployment: getOrCreateEmployment (
          company: $company,
          source: $source
        ) {
          id
          source {
            name
          }
          company {
            id
            name
          }
        }
        employments {
          id
          source {
            name
          }
          company {
            id
            name
          }
        }
        hirer {
          company {
            survey: surveyByFilters (filters: {
              slug: $surveySlug
            }) {
              id
              slug
              sections: surveySections {
                id
                questions: surveyQuestions {
                  id
                  type
                }
              }
              section: surveySectionByFilters (
                filters: {
                  id: $sectionId
                }
              ) {
                id
                questions: surveyQuestions {
                  id
                  type
                }
                question: surveyQuestionByFilters (
                  filters: {
                    id: $questionId
                  }
                ) {
                  id
                  title
                  description
                  name
                  type
                  required
                }
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
    surveySlug: params.surveySlug,
    sectionId: params.sectionId,
    questionId: params.questionId,
    company: body.employment,
    source: body.source
  }
  return { gql, variables }
}

const postConnectionAnswer = ({ session, params, body }) => {
  const gql = `
    mutation createSurveyAnswer (
      $connections: [ID!]!
      $userId: ID!
      $surveyQuestion: ID!
    ) {
      storeSurveyAnswer (
        surveyQuestion: $surveyQuestion
        person: $userId
        connections: $connections
      ) {
        id
      }
    }
  `
  const variables = {
    userId: session.userId,
    surveyQuestion: params.questionId,
    connections: body.connections,
    surveySlug: params.surveySlug,
    sectionId: params.sectionId
  }
  const respond = (data) => {
    throw new Redirect({
      url: `/surveys/${params.surveySlug}/complete`
    })
  }
  return { gql, variables, respond }
}

module.exports = {
  getQuestion,
  postEmployment,
  postConnectionAnswer
}
