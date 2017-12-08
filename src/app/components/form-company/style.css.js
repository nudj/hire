const {
  StyleSheet,
  sizes,
  typography
} = require('@nudj/components/lib/css')

const stylesheet = StyleSheet.create({
  button: {
    marginTop: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    fontWeight: typography.fontWeight.regular,
    '@media (min-width: 37.5rem)': {
      paddingLeft: sizes.largeI,
      paddingRight: sizes.largeI
    }
  }
})

module.exports = stylesheet
