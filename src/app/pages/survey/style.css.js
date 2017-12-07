const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')
const { chooseNetwork } = require('../../lib/css/breakpoints')
const { merge } = require('@nudj/library')

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
  button: merge(typography.type.regular, {
    flexGrow: 1,
    width: '100%',
    [`@media(${chooseNetwork.full})`]: {
      flexGrow: 'inherit',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      paddingLeft: sizes.largeIii,
      paddingRight: sizes.largeIii,
      width: 'auto'
    }
  }),
  heading: {
    marginBottom: sizes.largeIi
  },
  companyName: {
    color: colors.midRed
  }
})

module.exports = styleSheet
