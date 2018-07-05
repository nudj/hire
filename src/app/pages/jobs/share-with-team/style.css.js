const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')
const { modal } = require('../../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  selectAllCheckboxWrapper: {
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: colors.greyLight,
    display: 'flex',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    marginRight: 'auto',
    ':hover': {
      cursor: 'pointer',
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    }
  },
  selectAllCheckbox: {
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular
  },
  modalJobList: {
    maxHeight: '10.5rem',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    backgroundColor: colors.background.blue,
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    overflowY: 'scroll',
    marginTop: sizes.largeIi
  },
  modalJobListItem: {
    ':nth-child(n+1) + *': {
      marginTop: sizes.regular
    },
    ':last-child': {
      paddingBottom: sizes.regular
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
