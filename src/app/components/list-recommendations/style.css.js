const { StyleSheet, sizes } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginBottom: 0
  },
  listItem: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  }
})

module.exports = styleSheet
