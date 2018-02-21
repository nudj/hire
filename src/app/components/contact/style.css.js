const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center'
  },
  details: {
    flexBasis: '100%',
    flexGrow: 1
  },
  children: {
    flexShrink: 1
  },
  name: {
    color: colors.primary
  },
  attributes: {
    color: colors.text,
    marginTop: sizes.smallIi
  }
})

module.exports = styleSheet
