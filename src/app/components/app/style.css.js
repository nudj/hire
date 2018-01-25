const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  paragraph: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '38rem',
    marginTop: sizes.largeIi,
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    }
  }
})

module.exports = styleSheet
