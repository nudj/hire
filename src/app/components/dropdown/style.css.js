const { StyleSheet, sizes, colors, typography, utilities } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginTop: '0.5rem',
    borderRadiusTopLeft: utilities.borderRadius,
    borderRadiusTopRight: utilities.borderRadius,
    borderRadiusBottomLeft: utilities.borderRadius,
    borderRadiusBottomRight: utilities.borderRadius,
    boxShadow: utilities.boxShadow[20].narrow
  },
  listItem: {
    ...typography.type.smallIi,
    fontWeight: typography.fontWeight.bold,
    paddingTop: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.regular
  },
  dropdown: {
    display: 'inline-block',
    position: 'relative'
  },
  dropdownContent: {
    display: 'block',
    position: 'absolute',
    right: 0,
    zIndex: 1,
    minWidth: sizes.largeVii,
    backgroundColor: colors.white
  },
  header: {
    ...typography.type.smallI,
    fontWeight: typography.fontWeight.bold,
    whiteSpace: 'nowrap'
  },
  chevron: {
    transform: 'rotate(180deg)'
  }
})

module.exports = styleSheet
