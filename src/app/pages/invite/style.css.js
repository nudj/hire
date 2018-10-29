const { StyleSheet, colors, sizes } = require('@nudj/components/styles')
const { wizardAction } = require('../../lib/css/breakpoints')

const stylesheet = StyleSheet.create({
  sendInvitesButton: {
    width: '100%',
    marginTop: sizes.regular,
    [`@media(${wizardAction.center})`]: {
      width: 'auto'
    }
  },
  body: {
    display: 'flex'
  },
  invitationLink: {
    width: '100%',
    marginRight: sizes.regular
  },
  invitationInput: {
    backgroundColor: colors.greyLightest
  },
  descriptionParagraph: {
    marginTop: sizes.regular,
    maxWidth: '32rem',
    ':first-child': {
      marginTop: 0
    }
  }
})

module.exports = stylesheet
