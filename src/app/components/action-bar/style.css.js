const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  action: {
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: colors.greyLight,
    textDecoration: 'none',
    ':last-child': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px'
    },
    ':hover': {
      cursor: 'pointer',
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    }
  }
})

module.exports = styleSheet
