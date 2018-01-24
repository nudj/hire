const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  list: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  listItem: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  }
})

module.exports = styleSheet
