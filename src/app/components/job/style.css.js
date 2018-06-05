const {
  StyleSheet,
  colors,
  sizes,
  typography
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left',
    position: 'relative',
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    overflow: 'hidden'
  },
  title: {
    color: colors.primary
  },
  location: {
    display: 'inline-block',
    fontWeight: typography.fontWeight.bold,
    color: colors.midRed,
    marginRight: sizes.regular
  },
  statisticsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: sizes.regular,
    marginBottom: 0,
    marginLeft: `-${sizes.smallIi}`,
    marginRight: `-${sizes.smallIi}`,
    textAlign: 'left',
    maxWidth: '28.25rem'
  },
  statisticItem: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    flexBasis: '100%',
    ':nth-child(1) ~ *': {
      marginTop: sizes.smallIi
    },
    '@media(min-width: 12rem)': {
      flexBasis: '50%',
      ':nth-child(1) ~ *': {
        marginTop: 0
      },
      ':nth-child(2) ~ *': {
        marginTop: sizes.smallIi
      }
    },
    '@media(min-width: 28.75rem)': {
      flexBasis: 'auto',
      ':nth-child(1) ~ *': {
        marginTop: 0
      },
      ':nth-child(2) ~ *': {
        marginTop: 0
      }
    }
  },
  statisticLabel: {
    order: 1,
    color: colors.text,
    marginLeft: 0
  },
  statisticValue: {
    order: 2,
    color: colors.text,
    fontWeight: typography.fontWeight.bold,
    marginTop: sizes.smallIii
  },
  tagContainer: {
    marginTop: sizes.regular
  },
  tagGroup: {
    paddingTop: sizes.smallIii
  }
})

module.exports = styleSheet
