const { StyleSheet, colors, sizes, typography } = require('@nudj/components/styles')
const { modal } = require('../../lib/css/breakpoints')

const breakpoint = '41.176470588rem'

const styleSheet = StyleSheet.create({
  atsLogo: {
    maxWidth: sizes.largeIi,
    width: '100%',
    height: '100%',
    alignContent: 'center'
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
  },
  addJobButton: {
    whiteSpace: 'nowrap',
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0
  },
  helpPanels: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: sizes.largeIv,
    '@media(min-width: 38.75rem)': {
      flexDirection: 'row',
      marginLeft: `-${sizes.regular}`,
      marginRight: `-${sizes.regular}`
    }
  },
  helpPanel: {
    flexGrow: 1,
    textAlign: 'left',
    ':nth-child(n + 2)': {
      marginTop: sizes.largeIi
    },
    '@media(min-width: 38.75rem)': {
      maxWidth: '33.33333%',
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      ':nth-child(n + 2)': {
        marginTop: 0
      }
    }
  },
  helpLink: {
    ...typography.type.smallI,
    fontWeight: typography.fontWeight.bold,
    marginTop: sizes.regular
  },
  descriptionParagraph: {
    marginTop: sizes.regular,
    maxWidth: '32rem',
    ':first-child': {
      marginTop: 0
    }
  }
})

module.exports = styleSheet
