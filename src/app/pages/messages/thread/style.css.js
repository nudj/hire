const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  threadSubject: {
    lineHeight: 1,
    color: colors.primary
  },
  recipientName: {
    lineHeight: 1,
    color: colors.text,
    marginTop: sizes.smallIi
  },
  recipientEmail: {
    lineHeight: 1,
    marginTop: sizes.smallIi
  },
  threadSection: {
    textAlign: 'left',
    paddingTop: sizes.largeIi,
    paddingBottom: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi,
    ':nth-child(n + 2)': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: colors.greyLight
    }
  },
  replyButton: {
    marginTop: sizes.largeI
  }
})

module.exports = styleSheet
