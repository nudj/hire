const Global = `
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
`

module.exports = {
  Global
}
