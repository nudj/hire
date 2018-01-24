const { merge } = require('@nudj/library')
const { StyleSheet, typography, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
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
    '@media(min-width: 34.25rem)': {
      flexWrap: 'nowrap'
    }
  },
  logoContainer: {
    flexBasis: '50%',
    alignSelf: 'center',
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    '@media(min-width: 34.25rem)': {
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
    '@media(min-width: 34.25rem)': {
      order: 'initial',
      width: 'auto',
      flexGrow: 1
    }
  },
  helpContainer: {
    flexBasis: '50%',
    textAlign: 'right',
    '@media(min-width: 34.25rem)': {
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
    '@media(min-width: 34.25rem)': {
      display: 'block'
    }
  },
  navigationListItem: {
    display: 'inline-block',
    height: '100%',
    flexGrow: 1
  },
  navigationLink: merge(typography.type.smallIi, {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    color: colors.greyDarker,
    cursor: 'pointer',
    display: 'block',
    fontWeight: typography.fontWeight.bold,
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 150ms',
    position: 'relative',
    verticalAlign: 'middle',
    height: '100%',
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
    '@media(min-width: 34.25rem)': merge(typography.type.smallI, {
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
      bottom: '-1px',
      position: 'absolute',
      backgroundColor: colors.greyDarker,
      left: 0
    }
  },
  helpLink: merge(typography.type.smallIi, {
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    fontWeight: typography.fontWeight.bold,
    '@media(min-width: 34.25rem)': merge(typography.type.smallI, {
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
    ':before': {
      content: '""',
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'middle'
    },
    '@media(min-width: 34.25rem)': merge(typography.type.smallI, {
      fontWeight: typography.fontWeight.bold
    })
  })
})

module.exports = styleSheet
