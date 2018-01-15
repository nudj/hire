const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left',
  },
  metaDataItem: {
    color: colors.primary
  },
  body: {
    marginTop: sizes.largeI
  }
})

module.exports = styleSheet
