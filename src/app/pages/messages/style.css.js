const { StyleSheet, typography, sizes, colors } = require('@nudj/components/styles')
const { modal } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  list: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0
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
  },
  betaFeature: {
    marginTop: '0',
    marginBottom: '1rem'
  },
  betaTag: {
    ...typography.type.smallIi,
    textTransform: 'uppercase',
    backgroundColor: colors.midRed,
    color: colors.white,
    paddingTop: sizes.smallIi,
    paddingLeft: sizes.smallIi,
    paddingBottom: sizes.smallIi,
    paddingRight: sizes.smallIi,
    borderRadius: '0.25rem',
    display: 'inline-block'
  }
})

module.exports = styleSheet
