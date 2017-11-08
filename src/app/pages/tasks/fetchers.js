const get = () => {
  const fragment = `
    fragment Page on Mutation {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        id
        firstName
        tasks {
          id
          modified
          type
          completed
        }
        hirer {
          company {
            tasks {
              id
              modified
              type
              completed
              completedBy {
                id
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  `
  const variables = {}
  return { fragment, variables }
}

module.exports = {
  get
}
