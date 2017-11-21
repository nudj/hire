const { Global } = require('../../lib/graphql')

const get = ({ session, params }) => {
  const gql = `
    query SurveyQuestionPage (
      $userId: ID!,
      $surveySlug: String!,
      $sectionId: ID!,
      $connectionsType: Boolean!,
      $employersType: Boolean!,
      $questionId: ID!
    ) {
      user (id: $userId) {
        formerEmployers @include(if: $employersType) {
          id
          source
          company {
            id
            name
          }
        }
        connections @include(if: $connectionsType) {
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
              section: surveySectionById (
                id: $sectionId
              ) {
                id
                questions: surveyQuestions {
                  id
                  type
                }
                question: surveyQuestionById (
                  id: $questionId
                ) {
                  id
                  title
                  description
                  name
                  type
                  required
                  dependencies
                  options
                  tags
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
    employersType: params.questionType === 'companies',
    connectionsType: params.questionType === 'connections',
    questionId: params.questionId
  }
  return { gql, variables }
}

const postFormerEmployer = ({ session, params, body }) => {
  const gql = `
    mutation AddFormerEmployer (
      $userId: ID!,
      $surveySlug: String,
      $sectionId: ID!,
      $questionId: ID!,
      $formerEmployer: CompanyCreateInput!,
      $source: String!
    ) {
      user (id: $userId) {
        newFormerEmployer: getOrCreateFormerEmployer (
          formerEmployer: $formerEmployer,
          source: $source
        ) {
          id
          source
          company {
            id
            name
          }
        }
        formerEmployers {
          id
          source
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
              }
              section: surveySectionById (
                id: $sectionId
              ) {
                id
                questions: surveyQuestions {
                  id
                  type
                }
                question: surveyQuestionById (
                  id: $questionId
                ) {
                  id
                  title
                  description
                  name
                  type
                  required
                  dependencies
                  options
                  tags
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
    formerEmployer: body.formerEmployer,
    source: body.source
  }
  return { gql, variables }
}

const postConnection = ({ session, params, body }) => {
  const gql = `
    mutation AddConnection (
      $userId: ID!,
      $surveySlug: String,
      $sectionId: ID!,
      $questionId: ID!,
      $connection: PersonCreateInput!,
      $source: String!
    ) {
      user (id: $userId) {
        newConnection: getOrCreateConnection (
          to: $connection,
          source: $source
        ) {
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
          source {
            name
          }
          person {
            id
            email
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
              }
              section: surveySectionById (
                id: $sectionId
              ) {
                id
                questions: surveyQuestions {
                  id
                  type
                }
                question: surveyQuestionById (
                  id: $questionId
                ) {
                  id
                  title
                  description
                  name
                  type
                  required
                  dependencies
                  options
                  tags
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
    connection: body.connection,
    source: body.source
  }
  return { gql, variables }
}

module.exports = {
  get,
  postFormerEmployer,
  postConnection
}
