const { StyleSheet, sizes, colors, typography } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left'
  },
  field: {
    ':nth-child(1) ~ *': {
      marginTop: sizes.regular
    }
  },
  fieldLabel: {
    ...typography.type.smallI,
    fontWeight: typography.fontWeight.bold,
    color: colors.text
  },
  segment: {
    width: '50%'
  }
})

module.exports = styleSheet
