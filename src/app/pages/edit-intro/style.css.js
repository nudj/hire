const { StyleSheet, colors, typography, sizes } = require('@nudj/components/lib/css')

const stylesheet = StyleSheet.create({
  form: {
    textAlign: 'center',
    marginTop: 0
  },
  card: {
    textAlign: 'left'
  },
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
    minHeight: '12rem',
    width: '100%',
    height: '100%'
  },
  descriptionParagraph: {
    marginBottom: sizes.regular,
    maxWidth: '32rem'
  }
})

module.exports = stylesheet
