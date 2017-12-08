const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')
const { centerPageAction } = require('../../lib/css/breakpoints')

const styleSheet = StyleSheet.create({
  button: {
    flexGrow: 1,
    width: '100%',
    [`@media(${centerPageAction.full})`]: {
      flexGrow: 'inherit',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      paddingLeft: sizes.largeIii,
      paddingRight: sizes.largeIii,
      width: 'auto'
    }
  },
  companyName: {
    color: colors.midRed
  }
})

module.exports = styleSheet
