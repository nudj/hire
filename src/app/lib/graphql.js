const Global = `
  user (id: $userId) {
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
