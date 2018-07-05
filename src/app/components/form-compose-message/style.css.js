const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  field: {
    textAlign: 'left',
    ':nth-child(n + 2)': {
      marginTop: sizes.regular
    }
  },
  messageInput: {
    width: '100%',
    height: '100%'
  }
})

module.exports = styleSheet
