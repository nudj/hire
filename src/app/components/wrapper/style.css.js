const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    maxWidth: '70rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: sizes.largeIii,
    paddingBottom: sizes.largeVi,
    height: '100%',
    textAlign: 'left',
    '@media (min-width: 37.5rem)': {
      paddingLeft: sizes.regular,
      paddingRight: sizes.regular,
      textAlign: 'center'
    }
  }
})

module.exports = styleSheet