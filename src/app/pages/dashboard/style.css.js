const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const breakpoint = '56.25rem'

const styleSheet = StyleSheet.create({
  statisticsList: {
    [`@media(min-width: ${breakpoint})`]: {
      display: 'flex',
      marginLeft: `-${sizes.smallIi}`,
      marginRight: `-${sizes.smallIi}`,
      alignItems: 'stretch'
    }
  },
  statisticItem: {
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    },
    [`@media(min-width: ${breakpoint})`]: {
      flexBasis: '33.33333%',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':nth-child(1) ~ *': {
        marginTop: 0
      }
    }
  },
  durationButtonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    [`@media(min-width: ${breakpoint})`]: {
      width: 'auto',
      display: 'block'
    }
  },
  durationButton: {
    textDecoration: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    color: colors.greyDarkest,
    [`@media(min-width: ${breakpoint})`]: {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    }
  },
  durationButtonActive: {
    textDecoration: 'underline'
  }
})

module.exports = styleSheet
