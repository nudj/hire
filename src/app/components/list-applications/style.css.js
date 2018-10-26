const { StyleSheet, colors, sizes } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  listItem: {
    ':nth-child(n + 2)': {
      borderTopColor: colors.greyLight,
      borderTopWidth: '1px',
      borderTopStyle: 'solid'
    },
    ':first-of-type > *': {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px'
    },
    ':last-of-type > *': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px'
    }
  },
  item: {
    width: '100%',
    paddingTop: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular
  },
  itemInteractive: {
    ':hover': {
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    }
  }
})

module.exports = styleSheet
