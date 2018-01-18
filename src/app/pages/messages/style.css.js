const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')
const { modal } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  section: {
    ':nth-child(n + 2)': {
      marginTop: sizes.largeIi
    }
  },
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
    ':not(:first-of-type)': {
      marginTop: sizes.regular
    },
    [`@media(${modal.unstackButtons})`]: {
      width: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':not(:first-of-type)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
