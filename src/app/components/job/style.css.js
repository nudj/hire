const {
  StyleSheet,
  colors,
  sizes,
  typography
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    '@media(min-width: 62.5rem)': {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  header: {
    '@media(min-width: 38.75rem)': {
      textAlign: 'center'
    },
    '@media(min-width: 62.5rem)': {
      width: '33.333%',
      maxWidth: '13.125rem',
      textAlign: 'left'
    }
  },
  title: {
    color: colors.greyDarker
  },
  location: {
    color: colors.greyDarker
  },
  statisticsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: `-${sizes.smallIi}`,
    marginRight: `-${sizes.smallIi}`,
    textAlign: 'left',
    '@media(min-width: 38.75rem)': {
      textAlign: 'center'
    },
    '@media(min-width: 62.5rem)': {
      flexGrow: 1,
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      textAlign: 'left'
    }
  },
  statisticItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '33.33333%',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    marginTop: sizes.largeIi,
    flexGrow: 1,
    '@media(min-width: 62.5rem)': {
      marginTop: 0
    }
  },
  statisticLabel: {
    order: 1,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    marginLeft: 0
  },
  statisticValue: {
    order: 2,
    fontWeight: typography.fontWeight.bold,
    marginTop: sizes.smallIi
  },
  actions: {
    marginTop: sizes.largeIi,
    display: 'flex',
    flexDirection: 'column',
    '@media(min-width: 38.75rem)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '@media(min-width: 62.5rem)': {
      flexDirection: 'row-reverse',
      marginTop: 0
    }
  },
  action: {
    width: '100%',
    maxWidth: '12.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    },
    '@media(min-width: 38.75rem)': {
      width: 'auto',
      marginLeft: 0,
      marginRight: 0,
      ':nth-child(n + 2)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
