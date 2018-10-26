const { StyleSheet, sizes } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  field: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  submit: {
    marginTop: sizes.regular
  }
})

module.exports = styleSheet
