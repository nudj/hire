const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  jobCard: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    ':nth-child(1) ~ *': {
      marginTop: sizes.largeI
    }
  }
})

module.exports = styleSheet
