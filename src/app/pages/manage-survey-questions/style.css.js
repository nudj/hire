const { StyleSheet, sizes, colors, utilities } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  listItem: {
    display: 'flex',
    alignItems: 'stretch',
    listStyle: 'none',
    backgroundColor: colors.white,
    boxShadow: utilities.boxShadow[10].narrow
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
  descriptionParagraph: {
    marginTop: sizes.regular,
    maxWidth: '32rem',
    ':first-child': {
      marginTop: 0
    }
  }
})

module.exports = styleSheet
