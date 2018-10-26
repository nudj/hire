const { StyleSheet, sizes } = require('@nudj/components/styles')
const { modal } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'center'
  },
  gmailLogo: {
    width: '2rem',
    height: '1.5625rem'
  },
  heading: {
    marginTop: sizes.largeIi
  },
  body: {
    marginTop: sizes.regular
  },
  buttonGroup: {
    marginTop: sizes.largeIi,
    [`@media(${modal.unstackButtons})`]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  button: {
    width: '100%',
    ':not(:first-of-type)': {
      marginTop: sizes.regular
    },
    [`@media(${modal.unstackButtons})`]: {
      width: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':not(:first-of-type)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
