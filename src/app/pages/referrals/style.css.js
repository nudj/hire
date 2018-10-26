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
