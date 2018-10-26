const { StyleSheet, colors, typography, sizes } = require('@nudj/components/styles')

const { merge } = require('@nudj/library')

const stylesheet = StyleSheet.create({
  addFieldButton: {
    display: 'block',
    marginLeft: 0,
    paddingLeft: 0
  },
  fieldLabel: merge(typography.type.largeI, {
    color: colors.primary,
    textAlign: 'left',
    display: 'flex'
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
  flex: {
    display: 'flex'
  },
  inputGroup: {
    flexBasis: '50%'
  },
  label: {
    textAlign: 'left',
    flexBasis: '50%'
  }
})

module.exports = stylesheet
