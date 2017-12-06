const {
  StyleSheet,
  colors,
  sizes,
  utilities,
  typography
} = require('@nudj/components/lib/css')

const stylesheet = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: utilities.borderRadius,
    boxShadow: utilities.boxShadow[10].narrow,
    padding: sizes.largeIi,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '70%',
    '@media (min-width: 37.5rem)': {
      maxWidth: '20rem'
    }
  },
  button: {
    marginTop: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    fontSize: typography.fontSize.smallI,
    fontWeight: typography.fontWeight.regular,
    '@media (min-width: 37.5rem)': {
      fontSize: typography.fontSize.regular,
      paddingLeft: sizes.largeI,
      paddingRight: sizes.largeI
    }
  }
})

module.exports = stylesheet
