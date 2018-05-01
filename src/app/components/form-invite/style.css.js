const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const stylesheet = StyleSheet.create({
  addFieldButton: {
    outline: 'none',
    display: 'block',
    marginLeft: 0,
    paddingLeft: 0
  },
  form: {
    marginTop: sizes.regular
  },
  fieldLabel: {
    textAlign: 'left'
  },
  field: {
    marginTop: sizes.regular
  }
})

module.exports = stylesheet
