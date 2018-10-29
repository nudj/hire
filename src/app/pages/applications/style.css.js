const { StyleSheet, typography, sizes, colors } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
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
