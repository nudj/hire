const {
  StyleSheet,
  sizes,
  colors,
  utilities,
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  list: {
    textAlign: 'left',
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    listStylePosition: 'inside',
    marginTop: sizes.largeIi,
    marginBottom: 0
  },
  image: {
    width: '100%',
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: `1px solid ${colors.greyLight}`,
    borderRadius: utilities.borderRadius
  }
})

module.exports = styleSheet