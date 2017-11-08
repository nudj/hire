const get = () => {
  const fragment = `
    fragment Page on Mutation {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        id
        connections {
          id
          to {
            id
            firstName
            lastName
            title
            company
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
