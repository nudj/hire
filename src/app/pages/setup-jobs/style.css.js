const { StyleSheet, colors, typography, sizes } = require('@nudj/components/lib/css')

const { merge } = require('@nudj/library')

const stylesheet = StyleSheet.create({
  form: {
    textAlign: 'left',
    marginTop: 0
  },
  addFieldButton: {
    display: 'block',
    marginLeft: 0,
    paddingLeft: 0
  },
  fieldLabel: merge(typography.type.largeI, {
    color: colors.primary
  }),
  fieldset: {
    border: 'none',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  },
  asterisk: merge(typography.type.smallIi, {
    color: colors.greyDark,
    verticalAlign: 'super'
  }),
  field: {
    marginTop: sizes.regular
  },
  textarea: {
    minHeight: '12rem',
    width: '100%',
    height: '100%'
  }
})

module.exports = stylesheet
