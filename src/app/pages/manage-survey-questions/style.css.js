const { StyleSheet, typography, sizes, colors, utilities } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  listItem: {
    display: 'flex',
    alignItems: 'stretch',
    listStyle: 'none',
    backgroundColor: colors.white,
    boxShadow: utilities.boxShadow[10].narrow,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    ':nth-child(n+2)': {
      borderTopColor: colors.greyLight,
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0'
    },
    ':last-child': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px'
    },
    ':first-child > :first-child ': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '0'
    },
    ':nth-child(n+2) > :first-child': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0'
    },
    ':last-child > :first-child': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: '4px'
    }
  },
  listHeading: {
    marginTop: sizes.regular,
    ':first-child': {
      marginTop: 0
    }
  },
  card: {
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: sizes.regular,
    paddingLeft: sizes.largeI,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    display: 'block',
    textDecoration: 'none',
    ':hover': {
      cursor: 'pointer'
    }
  },
  chevron: {
    verticalAlign: 'middle',
    transform: 'rotate(90deg)',
    width: sizes.largeIi,
    height: sizes.largeIi,
    color: colors.black
  },
  titleContainer: {
    display: 'flex'
  },
  title: {
    color: colors.primary,
    flexBasis: '100%',
    lineHeight: 1
  },
  subtitle: {
    display: 'inline-block',
    fontWeight: typography.fontWeight.bold,
    color: colors.midRed,
    marginRight: sizes.regular,
    marginTop: sizes.smallIii
  },
  descriptionParagraph: {
    marginTop: sizes.regular,
    maxWidth: '32rem',
    ':first-child': {
      marginTop: 0
    }
  },
  heading: {
    display: 'flex',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    ':before': {
      width: sizes.regular,
      content: '""',
      height: '1px',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginRight: sizes.smallIi
    },
    ':after': {
      content: '""',
      height: '1px',
      width: '100%',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginLeft: sizes.smallIi
    }
  }
})

module.exports = styleSheet
