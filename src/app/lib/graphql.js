const GlobalFragment = `
  fragment Global on Person {
    incompleteTaskCount
    hirer {
      company {
        onboarded
      }
    }
  }
`

module.exports = {
  GlobalFragment
}
