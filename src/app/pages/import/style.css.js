const { StyleSheet, sizes } = require('@nudj/components/lib/css')
const { chooseNetwork } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  buttonGroup: {
    alignSelf: 'flex-end',
    bottom: sizes.regular,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    left: 0,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    position: 'absolute',
    width: '100%',
    [`@media(${chooseNetwork.full})`]: {
      bottom: 'auto',
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 1,
      justifyContent: 'center',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  },
  button: {
    flexBasis: '100%',
    width: '100%',
    ':not(:first-child)': {
      marginTop: sizes.regular
    },
    [`@media(${chooseNetwork.full})`]: {
      flexBasis: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      width: 'auto',
      ':not(:first-child)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
