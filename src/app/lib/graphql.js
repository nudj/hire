const Global = `
  user (id: $userId) {
    incompleteTaskCount
    hirer {
      onboarded {
        created
      }
      company {
        onboarded {
          created
        }
      }
    }
  }
`

module.exports = {
  Global
}
