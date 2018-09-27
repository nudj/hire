const { merge } = require('@nudj/library')
const { StyleSheet, typography, sizes, colors } = require('@nudj/components/lib/css')

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
    minHeight: '100%'
  },
  pageHeader: {
    display: 'flex',
    backgroundColor: colors.white,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    width: '100%',
    flexWrap: 'wrap',
    '@media(min-width: 42.25rem)': {
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
    '@media(min-width: 42.25rem)': {
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
    '@media(min-width: 42.25rem)': {
      order: 'initial',
      width: 'auto',
      flexGrow: 1
    }
  },
  inviteLink: {
    color: colors.greyDark
  },
  inviteLinkActive: {
    color: colors.royalBlue
  },
  helpContainer: {
    flexBasis: '60%',
    textAlign: 'right',
    '@media(min-width: 42.25rem)': {
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
    '@media(min-width: 42.25rem)': {
      display: 'block',
      overflow: 'visible'
    }
  },
  navigationListItem: {
    display: 'inline-block',
    height: '100%',
    flexGrow: 1,
    ':first-child': {
      paddingLeft: sizes.smallIi
    },
    ':last-child': {
      paddingRight: sizes.smallIi
    },
    '@media(min-width: 42.25rem)': {
      ':first-child': {
        paddingLeft: 0
      },
      ':last-child': {
        paddingRight: 0
      }
    }
  },
  navigationLink: merge(typography.type.smallIi, {
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
    '@media(min-width: 42.25rem)': merge(typography.type.smallI, {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      fontWeight: typography.fontWeight.bold,
      paddingTop: 0,
      paddingBottom: 0
    })
  }),
  navigationLinkActive: {
    ':after': {
      content: '""',
      width: '100%',
      height: '1px',
      bottom: 0,
      position: 'absolute',
      backgroundColor: colors.greyDarker,
      left: 0
    }
  },
  helpLink: merge(typography.type.smallIi, {
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    fontWeight: typography.fontWeight.bold,
    '@media(min-width: 42.25rem)': merge(typography.type.smallI, {
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
    '@media(min-width: 42.25rem)': merge(typography.type.smallI, {
      fontWeight: typography.fontWeight.bold
    })
  })
})

module.exports = styleSheet
