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
    '@media(min-width: 50rem)': {
      flexDirection: 'row',
      alignItems: 'center'
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
    '@media(min-width: 50rem)': {
      flexGrow: 1,
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi
    }
  },
  statisticItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '33.33333%',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    marginTop: sizes.regular,
    flexGrow: 1,
    '@media(min-width: 50rem)': {
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
    marginTop: sizes.regular,
    display: 'flex',
    flexDirection: 'column',
    '@media(min-width: 50rem)': {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginTop: 0
    }
  },
  action: {
    width: '100%',
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    },
    '@media(min-width: 50rem)': {
      width: 'auto',
      ':nth-child(n + 2)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
