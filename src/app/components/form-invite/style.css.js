const { StyleSheet, colors, typography, sizes } = require('@nudj/components/lib/css')

const { merge } = require('@nudj/library')

const stylesheet = StyleSheet.create({
  addFieldButton: {
    outline: 'none',
    display: 'block',
    marginLeft: 0,
    paddingLeft: 0
  },
  fieldLabel: merge(typography.type.largeI, {
    color: colors.primary,
    textAlign: 'left'
  }),
  fieldset: {
    border: 'none'
  },
  asterisk: merge(typography.type.smallIi, {
    color: colors.greyDark,
    verticalAlign: 'super'
  }),
  field: {
    marginTop: sizes.regular
  }
})

module.exports = stylesheet
