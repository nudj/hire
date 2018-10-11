const { merge } = require('@nudj/library')
const { StyleSheet, typography, sizes, colors, utilities } = require('@nudj/components/lib/css')

const navLinkStyle = merge(typography.type.smallIi, {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderWidth: 0,
  color: colors.greyDarker,
  cursor: 'pointer',
  display: 'block',
  fontWeight: typography.fontWeight.bold,
  paddingLeft: sizes.smallIi,
  paddingRight: sizes.smallIi,
  paddingTop: sizes.smallIi,
  paddingBottom: sizes.smallIi,
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 150ms',
  position: 'relative',
  verticalAlign: 'middle',
  height: '100%',
  whiteSpace: 'nowrap',
  ':hover': {
    color: colors.greyDark
  },
  ':focus': {
    color: colors.greyDark
  },
  ':before': {
    content: '""',
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle'
  },
  '@media(min-width: 48rem)': merge(typography.type.smallI, {
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    fontWeight: typography.fontWeight.bold,
    paddingTop: 0,
    paddingBottom: 0
  })
})

const pageContentWidth = '75rem'

const styleSheet = StyleSheet.create({
  htmlBody: {
    backgroundColor: colors.greyLightest,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  root: {
    backgroundColor: colors.greyLightest,
    marginBottom: sizes.largeIi,
    minHeight: `calc(100% - ${sizes.largeIi})`
  },
  pageHeader: {
    display: 'flex',
    backgroundColor: colors.white,
    boxShadow: utilities.boxShadow[10].narrow,
    alignItems: 'stretch',
    width: '100%',
    flexWrap: 'wrap',
    '@media(min-width: 48rem)': {
      flexWrap: 'nowrap'
    }
  },
  pageHeaderInner: {
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: pageContentWidth,
    marginRight: 'auto',
    marginLeft: 'auto',
    flexWrap: 'wrap',
    '@media(min-width: 48rem)': {
      paddingRight: sizes.regular,
      paddingLeft: sizes.regular,
      flexWrap: 'nowrap'
    }
  },
  logoContainer: {
    flexBasis: '40%',
    alignSelf: 'center',
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    '@media(min-width: 48rem)': {
      flexBasis: 'auto',
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  bodyContainer: {
    order: '3',
    width: '100%',
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    '@media(min-width: 48rem)': {
      borderTop: 'none',
      order: 'initial',
      width: 'auto',
      flexGrow: 1
    }
  },
  inviteLink: {
    color: colors.greyDark
  },
  inviteLinkActive: {
    color: colors.primary
  },
  helpContainer: {
    flexBasis: '60%',
    textAlign: 'right',
    '@media(min-width: 48rem)': {
      flexBasis: 'auto'
    }
  },
  logo: {
    maxWidth: sizes.largeI,
    width: '100%',
    height: '100%'
  },
  navigationList: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    height: '100%',
    display: 'flex',
    overflowX: 'scroll',
    overflowScrolling: 'touch',
    '@media(min-width: 48rem)': {
      display: 'block',
      overflow: 'visible'
    }
  },
  navigationListItem: {
    display: 'inline-block',
    height: '100%',
    flexGrow: 1,
    ':first-child': {
      paddingLeft: 0
    },
    ':last-child': {
      paddingRight: 0
    }
  },
  navigationLink: navLinkStyle,
  navigationLinkActive: {
    ...navLinkStyle,
    color: colors.primary,
    ':after': {
      content: '""',
      width: '100%',
      height: '2px',
      paddingLeft: sizes.largeI,
      paddingRight: sizes.largeI,
      top: 0,
      position: 'absolute',
      backgroundColor: colors.primary,
      left: 0
    }
  },
  helpLink: merge(typography.type.smallIi, {
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    fontWeight: typography.fontWeight.bold,
    '@media(min-width: 48rem)': merge(typography.type.smallI, {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      fontWeight: typography.fontWeight.bold
    })
  }),
  title: merge(typography.type.smallI, {
    color: colors.greyDark,
    fontWeight: typography.fontWeight.bold,
    height: '100%',
    verticalAlign: 'middle',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    ':before': {
      content: '""',
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'middle'
    },
    '@media(min-width: 48rem)': merge(typography.type.smallI, {
      fontWeight: typography.fontWeight.bold
    })
  }),
  subNav: {
    borderRadius: '0',
    paddingTop: '0',
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '0',
    '@media(min-width: 48rem)': {
      borderRadius: utilities.borderRadius,
      width: '100%',
      maxWidth: '13rem'
    }
  },
  subNavLinkList: {
    listStyleType: 'none',
    display: 'flex',
    paddingLeft: '0',
    marginTop: '0',
    marginBottom: sizes.largeI,
    '@media(min-width: 48rem)': {
      display: 'block',
      marginBottom: '0'
    }
  },
  subNavListItem: {
    display: 'inline-block',
    position: 'relative',
    flexGrow: 1,
    textAlign: 'center',
    ':first-child': {
      paddingLeft: 0,
      borderTopLeftRadius: utilities.borderRadius,
      overflow: 'hidden'
    },
    ':last-child': {
      paddingRight: 0,
      borderBottomLeftRadius: utilities.borderRadius,
      overflow: 'hidden'
    },
    '@media(min-width: 48rem)': {
      ':first-child': {
        paddingLeft: sizes.largeIi
      },
      ':last-child': {
        paddingRight: 0
      },
      textAlign: 'left',
      display: 'block',
      height: '100%',
      paddingTop: sizes.regular,
      paddingBottom: sizes.regular,
      paddingLeft: sizes.largeIi,
      paddingRight: '0'
    }
  },
  subNavLink: {
    ...typography.type.smallIi,
    fontWeight: typography.fontWeight.bold,
    color: colors.greyDarker,
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    height: '100%',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    '@media(min-width: 48rem)': {
    }
  },
  activeSubNavLink: {
    color: colors.primary,
    ':after': {
      content: '""',
      width: '100%',
      height: '2px',
      top: 0,
      position: 'absolute',
      backgroundColor: colors.primary,
      left: 0
    },
    '@media(min-width: 48rem)': {
      ':after': {
        content: '""',
        width: '4px',
        height: '100%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: colors.primary,
        left: 0,
        top: 0
      }
    }
  },
  body: {
    '@media(min-width: 48rem)': {
      display: 'flex',
      alignItems: 'flex-start',
      maxWidth: pageContentWidth,
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingTop: sizes.regular,
      paddingRight: sizes.largeIi,
      paddingLeft: sizes.largeIi
    }
  },
  main: {
    width: '100%',
    overflow: 'hidden',
    '@media(min-width: 48rem)': {
      marginLeft: sizes.largeIi
    }
  }
})

module.exports = styleSheet
