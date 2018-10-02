const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    height: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      textAlign: 'center'
    }
  }
})

module.exports = styleSheet
