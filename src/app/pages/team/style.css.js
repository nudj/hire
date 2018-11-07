const { StyleSheet, typography, sizes, colors } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  descriptionParagraph: {
    marginTop: sizes.regular,
    maxWidth: '32rem',
    ':first-child': {
      marginTop: 0
    }
  },
  listDivider: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    display: 'flex',
    marginTop: sizes.regular,
    marginBottom: sizes.regular,
    alignItems: 'center',
    ':before': {
      content: '""',
      height: '1px',
      width: '100%',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginRight: sizes.regular
    },
    ':after': {
      content: '""',
      height: '1px',
      width: '100%',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginLeft: sizes.regular
    }
  },
  listContainer: {
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
    paddingLeft: sizes.regular,
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
  }
})

module.exports = styleSheet
