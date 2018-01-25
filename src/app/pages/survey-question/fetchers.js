const toUpper = require('lodash/toUpper')
const get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')
const { questionTypes } = require('../../lib/constants')
const getNextSurveyUri = require('./getNextSurveyUri')

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
    connectionsCount
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
      $blankSearch: Boolean!
    ) {
      user (id: $userId) {
        connections @include(if: $blankSearch) {
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
  if (query.search) {
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
    blankSearch: query.search === '',
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
      notification: setNotification (type: "success", message: "Company added") {
        type
        message
      }
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
      $questionId: ID!,
      $sectionId: ID!,
      $surveySlug: String!,
    ) {
      storeSurveyAnswer (
        surveyQuestion: $questionId
        person: $userId
        connections: $connections
      ) {
        id
      }
      user(id: $userId) {
        hirer {
          company {
            survey: surveyByFilters(filters: {slug: $surveySlug}) {
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
    }
  `

  const variables = {
    userId: session.userId,
    sectionId: params.sectionId,
    questionId: params.questionId,
    surveySlug: params.surveySlug,
    connections: body.connections
  }

  const respond = (data) => {
    const redirectUrl = getNextSurveyUri(get(data, 'user.hirer.company.survey', {}))

    throw new Redirect({
      url: redirectUrl
    })
  }

  return { gql, variables, respond }
}

const postNewConnection = ({ session, params, body }) => {
  const gql = `
    mutation addNewConnection (
      $userId: ID!
      $firstName: String!
      $lastName: String!
      $email: String!
      $title: String
      $company: String
      $source: SourceCreateInput!
    ) {
      user (id: $userId) {
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
        }
      }
    }
  `
  const variables = {
    userId: session.userId,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    title: body.title,
    company: body.company,
    source: { name: 'manual' }
  }
  return { gql, variables }
}

module.exports = {
  getQuestion,
  postEmployment,
  postConnectionAnswer,
  postNewConnection
}
