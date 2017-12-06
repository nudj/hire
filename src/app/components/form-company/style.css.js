const { StyleSheet, colors, sizes, utilities } = require('@nudj/components/lib/css')

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
    fontWeight: '500',
    '@media (min-width: 37.5rem)': {
      fontSize: '0.9rem'
    }
  }
})

module.exports = stylesheet
