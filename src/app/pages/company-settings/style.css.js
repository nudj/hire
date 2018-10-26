const { StyleSheet, colors, typography, sizes } = require('@nudj/components/styles')

const stylesheet = StyleSheet.create({
  fieldLabel: {
    ...typography.type.largeI,
    color: colors.primary
  },
  field: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  textarea: {
    minHeight: '10rem',
    width: '100%',
    height: '100%'
  }
})

module.exports = stylesheet
