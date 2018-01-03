const { Global } = require('../../lib/graphql')

const getCompaniesQuestion = ({ session, params, query }) => {
  const gql = `
    query CompaniesQuestionPage (
      $userId: ID!,
      $surveySlug: String!,
      $sectionId: ID!,
      $questionId: ID!
    ) {
      user (id: $userId) {
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
              tags
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
    search: encodeURIComponent(query.search || ''),
    fields: [
      ['firstName', 'lastName']
    ]
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
  getCompaniesQuestion,
  getConnectionsQuestion,
  postFormerEmployer,
  postConnection
}
