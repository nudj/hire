const {
  StyleSheet,
  sizes,
  colors,
  utilities,
  typography
} = require('@nudj/components/lib/css')

const { wizardAction } = require('../../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular,
    },
    [`@media(${wizardAction.center})`]: {
      ':nth-of-type(n + 2)': {
        marginTop: sizes.largeIi,
      },
    }
  },
  padding: {
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
  },
  largeI: {
    maxWidth: '42.375rem',
  },
  regular: {
    maxWidth: '31rem',
  },
  smallI: {
    maxWidth: '20rem',
  },
})

module.exports = styleSheet