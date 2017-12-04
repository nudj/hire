const { StyleSheet, colors, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    '@media(min-width: 42.375rem)': {
      flexDirection: 'row',
      flexShrink: 1,
      flexGrow: 0,
      justifyContent: 'center',
      alignSelf: 'flex-start'
    }
  },
  button: {
    width: '100%',
    flexBasis: '100%',
    ':not(:last-child)': {
      marginTop: sizes.regular
    },
    '@media(min-width: 42.375rem)': {
      flexBasis: 'auto',
      width: 'auto',
      marginLeft: sizes.smallIi,
      marginRight: sizes.smallIi,
      ':not(:last-child)': {
        marginTop: 0
      }
    }
  }
})

module.exports = styleSheet
