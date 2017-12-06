const { merge } = require('@nudj/framework/css')
const {
  StyleSheet,
  sizes,
  colors,
  typography
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  basket: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: sizes.largeIii,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: '0 0 auto',
    padding: `0 1rem`
  },
  children: {
    alignItems: 'center',
    display: 'inline-block',
    justifyContent: 'flex-end'
  },
  value: merge(typography.type.regular, {
    fontWeight: typography.fontWeight.bold,
    display: 'inline-block'
  })
})

module.exports = styleSheet
