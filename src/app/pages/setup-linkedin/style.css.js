const {
  StyleSheet,
  sizes,
  colors,
  utilities
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  list: {
    textAlign: 'left',
    maxWidth: '40rem',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0
  },
  image: {
    width: '100%',
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: `1px solid ${colors.greyLight}`,
    borderRadius: utilities.borderRadius
  },
  fullPageLoader: {
    height: `calc(100vh - ${sizes.largeIi})`
  }
})

module.exports = styleSheet
