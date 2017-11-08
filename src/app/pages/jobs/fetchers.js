const get = () => {
  const fragment = `
    fragment Page on Mutation {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          company {
            name
            jobs {
              id
              created
              title
              slug
              location
              bonus
              internalMessages {
                id
              }
              externalMessages {
                id
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
