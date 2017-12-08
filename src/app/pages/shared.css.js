const {
  StyleSheet,
  sizes,
  colors,
  utilities
} = require('@nudj/components/lib/css')
const { wizardAction } = require('../lib/css/breakpoints')

const multiplySizeVar = (size, multipler) =>
  `${parseInt(size.replace('rem', ''), 10) * multipler}rem`

const styleSheet = StyleSheet.create({
  root: {
    backgroundColor: colors.greyLightest,
    minHeight: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      textAlign: 'center'
    }
  },
  wrapper: {
    maxWidth: '60rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    height: '100%',
    '@media (min-width: 37.5rem)': {
      paddingTop: multiplySizeVar(sizes.largeIii, 2),
      paddingBottom: multiplySizeVar(sizes.largeIii, 2)
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
  actions: {
    alignSelf: 'flex-end',
    bottom: sizes.regular,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    left: 0,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    position: 'absolute',
    width: '100%',
    [`@media(${wizardAction.center})`]: {
      bottom: 'auto',
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 1,
      justifyContent: 'center',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  },
  action: {
    flexBasis: '100%',
    width: '100%',
    ':not(:first-child)': {
      marginTop: sizes.regular
    },
    [`@media(${wizardAction.center})`]: {
      flexBasis: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      width: 'auto',
      ':not(:first-child)': {
        marginTop: 0
      }
    }
  },
  footer: {},
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
    maxWidth: '37rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: `1px solid ${colors.greyLight}`,
    borderRadius: utilities.borderRadius
  },
  em: {
    fontStyle: 'italic'
  }
})

module.exports = styleSheet
