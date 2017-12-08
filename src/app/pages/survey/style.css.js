const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  companyName: {
    color: colors.midRed
  },
  startButton: {
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  }
})

module.exports = styleSheet
