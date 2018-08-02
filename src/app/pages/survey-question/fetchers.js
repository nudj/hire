const toUpper = require('lodash/toUpper')
const get = require('lodash/get')
const { Redirect } = require('@nudj/library/errors')

const { Global } = require('../../lib/graphql')
const { dataSources, questionTypes } = require('../../lib/constants')
const getNextSurveyUri = require('./getNextSurveyUri')

const getQuestion = data => {
  switch (toUpper(data.params.questionType)) {
    case questionTypes.COMPANIES:
      return getCompaniesQuestion(data)
    case questionTypes.CONNECTIONS:
      return getConnectionsQuestion(data)
  }
}

const getCompaniesQuestion = ({ params, query }) => {
  const gql = `
    query CompaniesQuestionPage (
      $surveySlug: String!,
      $sectionId: ID!,
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
            survey: surveyByFiltersOrDefault (filters: {
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
    surveySlug: params.surveySlug,
    sectionId: params.sectionId,
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
      $sectionId: ID!,
      $questionId: ID!
    ) {
      user {
        connectionsCount
        hirer {
          company {
            survey: surveyByFiltersOrDefault (filters: {
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
    sectionId: params.sectionId,
    questionId: params.questionId,
    search: query.search || ''
  }

  return { gql, variables }
}

const postEmployment = ({ params, body }) => {
  const gql = `
    mutation AddEmployment (
      $surveySlug: String,
      $sectionId: ID!,
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
            survey: surveyByFiltersOrDefault (filters: {
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
    surveySlug: params.surveySlug,
    sectionId: params.sectionId,
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
      user {
        hirer {
          company {
            survey: surveyByFiltersOrDefault (filters: {
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
  getQuestion,
  postEmployment,
  postConnectionAnswer,
  postNewConnection
}
