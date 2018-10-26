const { StyleSheet, sizes } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  heading: {
    ':nth-child(1) + p': {
      marginTop: sizes.regular
    }
  },
  paragraph: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '39rem',
    marginTop: sizes.regular,
    ':nth-of-type(n + 2)': {
      marginTop: sizes.regular
    }
  }
})

module.exports = styleSheet
