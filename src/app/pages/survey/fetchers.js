const { Global } = require('../../lib/graphql')

const get = ({
  session,
  params
}) => {
  const gql = `
    query SurveyPage (
      $userId: ID!,
      $surveySlug: String
    ) {
      user (id: $userId) {
        connections {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
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
                title
                description
                questions: surveyQuestions {
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
    surveySlug: params.surveySlug
  }
  return { gql, variables }
}

const postFormerEmployer = ({
  session,
  params,
  body
}) => {
  const gql = `
    mutation AddFormerEmployer (
      $userId: ID!,
      $surveySlug: String,
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
        connections {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
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
                title
                description
                questions: surveyQuestions {
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
    formerEmployer: body.formerEmployer,
    source: body.source
  }
  return { gql, variables }
}

const postConnection = ({
  session,
  params,
  body
}) => {
  const gql = `
    mutation AddConnection (
      $userId: ID!,
      $surveySlug: String,
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
          title
          company
          source
          person {
            id
            email
          }
        }
        connections {
          id
          firstName
          lastName
          title
          company
          source
          person {
            id
            email
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
                title
                description
                questions: surveyQuestions {
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
