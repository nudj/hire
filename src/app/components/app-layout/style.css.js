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
    alignItems: 'center',
    width: '100%'
  },
  logoContainer: {
    flexShrink: 0,
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    '@media(min-width: 30rem)': {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular
    }
  },
  bodyContainer: {
    flexGrow: 1
  },
  helpContainer: {
    flexShrink: 0
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
    height: '100%'
  },
  navigationListItem: {
    display: 'inline-block',
    height: '100%'
  },
  navigationLink: merge(typography.type.smallI, {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    color: colors.greyDarker,
    cursor: 'pointer',
    display: 'block',
    fontWeight: typography.fontWeight.bold,
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
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
    '@media(min-width: 30rem)': merge(typography.type.regular, {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      fontWeight: typography.fontWeight.bold
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
  helpLink: merge(typography.type.smallI, {
    paddingLeft: sizes.smallI,
    paddingRight: sizes.smallI,
    fontWeight: typography.fontWeight.bold,
    '@media(min-width: 30rem)': merge(typography.type.regular, {
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
    '@media(min-width: 30rem)': merge(typography.type.regular, {
      fontWeight: typography.fontWeight.bold
    })
  })
})

module.exports = styleSheet
