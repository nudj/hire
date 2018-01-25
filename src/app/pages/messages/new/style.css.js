const { StyleSheet, sizes, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  subjectInput: {
    fontWeight: typography.fontWeight.bold
  },
  messageInput: {
    marginTop: sizes.regular,
    width: '100%',
    height: '100%'
  }
})

module.exports = styleSheet
