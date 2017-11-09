const Global = `
  user (email: $userEmail) {
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
