const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const { modal } = require('../../lib/css/breakpoints')

const breakpoint = '41.176470588rem'

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
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
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
  draft: {
    opacity: '0.7'
  },
  archived: {
    opacity: '0.4'
  },
  jobCard: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
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
  },
  banner: {
    position: 'relative',
    textAlign: 'left'
  },
  closeButton: {
    position: 'absolute',
    top: sizes.smallIi,
    right: sizes.smallIi,
    left: 'auto'
  },
  actions: {
    marginTop: sizes.largeIii,
    textAlign: 'right'
  }
})

module.exports = styleSheet
