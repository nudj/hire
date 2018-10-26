const { StyleSheet, sizes } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  listHeading: {
    marginTop: sizes.regular,
    ':first-child': {
      marginTop: 0
    }
  }
})

module.exports = styleSheet
