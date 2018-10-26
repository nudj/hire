const { StyleSheet, sizes } = require('@nudj/components/styles')
const { wizardAction } = require('../../lib/css/breakpoints')

const stylesheet = StyleSheet.create({
  addCompanyButton: {
    width: '100%',
    marginTop: sizes.regular,
    [`@media(${wizardAction.center})`]: {
      width: 'auto'
    }
  },
  form: {
    marginTop: sizes.regular
  }
})

module.exports = stylesheet
