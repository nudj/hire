const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  list: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  listItem: {
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  modalWindow: {
    height: 'auto'
  },
  messageButton: {
    paddingTop: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingBottom: sizes.smallI,
    paddingLeft: sizes.smallI,
    width: '2.75rem',
    height: '2.75rem',
    lineHeight: 0,
    cursor: 'pointer'
  }
})

module.exports = styleSheet
