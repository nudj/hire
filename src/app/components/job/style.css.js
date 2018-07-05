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
    overflow: 'hidden'
  },
  editLink: {
    color: colors.primary,
    textDecoration: 'none',
    display: 'block',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    fontWeight: typography.fontWeight.bold,
    ':hover': {
      opacity: '0.8'
    }
  },
  editIcon: {
    marginRight: sizes.smallIii,
    verticalAlign: 'middle'
  },
  titleContainer: {
    display: 'flex'
  },
  title: {
    color: colors.primary,
    flexBasis: '100%',
    lineHeight: 1
  },
  location: {
    display: 'inline-block',
    fontWeight: typography.fontWeight.bold,
    color: colors.midRed,
    marginRight: sizes.regular,
    marginTop: sizes.smallIii
  },
  statisticsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: sizes.regular,
    marginBottom: 0,
    marginLeft: `-${sizes.smallIi}`,
    marginRight: `-${sizes.smallIi}`,
    textAlign: 'left'
  },
  statisticItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    ':nth-child(1) ~ *': {
      marginTop: sizes.smallIi
    },
    '@media(min-width: 28rem)': {
      flexBasis: '50%',
      ':nth-child(1) ~ *': {
        marginTop: 0
      },
      ':nth-child(2) ~ *': {
        marginTop: sizes.smallIi
      }
    },
    '@media(min-width: 40.75rem)': {
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
