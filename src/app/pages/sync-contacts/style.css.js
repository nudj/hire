const { StyleSheet, sizes } = require('@nudj/components/styles')
const { wizardAction } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  action: {
    [`@media(${wizardAction.center})`]: {
      ':not(:first-of-type)': {
        marginTop: sizes.regular
      }
    }
  }
})

module.exports = styleSheet
