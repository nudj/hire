const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')
const { modal } = require('../../../lib/css/breakpoints')

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
  },
  modal: {
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: sizes.largeIi,
    [`@media(${modal.unstackButtons})`]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  button: {
    width: '100%',
    ':not(:first-child)': {
      marginTop: sizes.regular
    },
    [`@media(${modal.unstackButtons})`]: {
      width: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':not(:first-child)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
