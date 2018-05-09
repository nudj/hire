const { StyleSheet } = require('@nudj/components/lib/css')
const { wizardAction } = require('../../lib/css/breakpoints')

const stylesheet = StyleSheet.create({
  sendInvitesButton: {
    width: '100%',
    [`@media(${wizardAction.center})`]: {
      width: 'auto'
    }
  }
})

module.exports = stylesheet
