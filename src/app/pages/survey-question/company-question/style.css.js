const {
  StyleSheet,
  sizes,
  colors,
  utilities
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  companyForm: {
    borderRadius: utilities.borderRadius,
    boxShadow: utilities.boxShadow[10].narrow,
    padding: sizes.largeIi,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: sizes.largeIi,
    width: '100%',
    '@media (min-width: 37.5rem)': {
      maxWidth: '20rem'
    }
  },
  header: {
    marginTop: sizes.largeI,
    color: colors.royalBlue
  }
})

module.exports = styleSheet
