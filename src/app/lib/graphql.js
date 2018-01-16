const Global = `
  user (id: $userId) {
    incompleteTaskCount
    hirer {
      onboarded
    }
  }
`

module.exports = {
  Global
}
