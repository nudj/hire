const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  button: {
    width: '100%',
    ':not(:first-child)': {
      marginTop: sizes.regular
    }
  },
  // todo rename
  comingSoon: {
    marginTop: sizes.smallI,
    color: colors.text
  }
})

module.exports = styleSheet
