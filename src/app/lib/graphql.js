const globalFragment = `
  fragment Global on Mutation {
    person: personByFilters (filters: {
      email: $userEmail
    }) {
      incompleteTaskCount
      hirer {
        company {
          onboarded
        }
      }
    }
  }
`

module.exports = {
  globalFragment
}
