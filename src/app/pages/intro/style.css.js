const { StyleSheet, colors, typography, sizes } = require('@nudj/components/styles')

const stylesheet = StyleSheet.create({
  introDetails: {
    textAlign: 'center',
    marginTop: 0
  },
  fieldLabel: {
    ...typography.type.largeI,
    color: colors.primary
  },
  field: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  }
})

module.exports = stylesheet
