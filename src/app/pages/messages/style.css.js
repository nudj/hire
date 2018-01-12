const { StyleSheet, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  card: {
    overflow: 'hidden'
  },
  list: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    textAlign: 'left'
  },
  listItem: {
    ':nth-child(n + 2)': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: colors.greyLight
    }
  }
})

module.exports = styleSheet
