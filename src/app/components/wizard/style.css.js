const {
  StyleSheet,
  sizes,
  colors,
  utilities,
  typography
} = require('@nudj/components/lib/css')

const { wizardAction } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  wrapper: {
    maxWidth: '70rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    height: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      paddingTop: sizes.largeIii,
      paddingBottom: sizes.largeIii,
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      textAlign: 'center'
    }
  },
  footer: {
    backgroundColor: colors.white,
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0,
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    textAlign: 'left',
    '@media(min-width: 30rem)': {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    }
  },
  heading: {
    maxWidth: '42.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.primary,
  },
  paragraph: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '38rem',
    marginTop: sizes.largeIi,
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    }
  },
  action: {
    width: '100%',
    ':not(:first-of-type)': {
      marginTop: sizes.regular
    },
    [`@media(${wizardAction.center})`]: {
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      width: 'auto',
      ':not(:first-of-type)': {
        marginTop: 0
      }
    }
  },
})

module.exports = styleSheet