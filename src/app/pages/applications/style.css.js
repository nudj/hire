const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  listHeading: {
    marginTop: sizes.regular,
    ':first-child': {
      marginTop: 0
    }
  }
})

module.exports = styleSheet
