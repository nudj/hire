const { StyleSheet, colors, typography, sizes } = require('@nudj/components/lib/css')

const { merge } = require('@nudj/library')

const stylesheet = StyleSheet.create({
  form: {
    textAlign: 'left',
    marginTop: 0
  },
  fieldLabel: merge(typography.type.largeI, {
    color: colors.primary
  }),
  field: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  textarea: {
    minHeight: '12rem',
    width: '100%',
    height: '100%'
  }
})

module.exports = stylesheet
