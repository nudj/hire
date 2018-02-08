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
  jobCard: {
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    }
  },
  durationButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderBottomColor: colors.greyLight,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid'
  },
  durationButton: {
    textDecoration: 'none',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    position: 'relative',
    [`@media(min-width: ${breakpoint})`]: {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    }
  },
  durationButtonActive: {
    color: colors.greyDarker,
    ':after': {
      content: '""',
      width: '100%',
      height: '1px',
      bottom: '-1px',
      position: 'absolute',
      backgroundColor: colors.greyDarker,
      left: 0
    }
  }
})

module.exports = styleSheet
