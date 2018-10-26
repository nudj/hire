const { StyleSheet, sizes, colors } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left'
  },
  metaDataItem: {
    color: colors.primary
  },
  body: {
    marginTop: sizes.regular
  }
})

module.exports = styleSheet
