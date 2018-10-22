const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
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
    marginBottom: sizes.regular,
    maxWidth: '32rem'
  }
})

module.exports = stylesheet
