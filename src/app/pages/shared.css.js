const {
  StyleSheet,
  sizes,
  colors,
  utilities,
  typography
} = require('@nudj/components/lib/css')

const { wizardAction } = require('../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  root: {
    backgroundColor: colors.greyLightest,
    minHeight: '100%'
  },
  wrapper: {
    maxWidth: '70rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    height: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      paddingTop: sizes.largeIii,
      paddingBottom: sizes.largeIii,
      textAlign: 'center'
    }
  },
  header: {
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heading: {
    color: colors.primary
  },
  headingHighlight: {
    color: colors.midRed
  },
  subheading: {
    marginTop: sizes.largeIi,
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    }
  },
  body: {
    width: '100%',
    marginTop: sizes.largeIi
  },
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '42.375rem'
  },
  cardMedium: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '31rem'
  },
  cardSmall: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '20rem'
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
  list: {
    textAlign: 'left',
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    listStylePosition: 'inside',
    marginTop: sizes.largeIi,
    marginBottom: 0
  },
  image: {
    width: '100%',
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: `1px solid ${colors.greyLight}`,
    borderRadius: utilities.borderRadius
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
  stepCounter: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    ':nth-child(1) + *': {
      marginTop: sizes.largeI
    }
  },
  addCounter: {
    fontWeight: typography.fontWeight.bold
  },
  em: {
    fontStyle: 'italic'
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
})

module.exports = styleSheet
