const { StyleSheet, sizes } = require('@nudj/components/lib/css')
const { wizardAction } = require('../../lib/css/breakpoints')

const stylesheet = StyleSheet.create({
  addCompanyButton: {
    width: '100%',
    marginTop: sizes.regular,
    [`@media(${wizardAction.center})`]: {
      width: 'auto'
    }
  }
})

module.exports = stylesheet
