const { StyleSheet, colors, typography, sizes } = require('@nudj/components/styles')

const { merge } = require('@nudj/library')

const stylesheet = StyleSheet.create({
  form: {
    textAlign: 'center',
    marginTop: 0
  },
  card: {
    textAlign: 'left'
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
