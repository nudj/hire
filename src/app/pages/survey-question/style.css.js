const { StyleSheet, sizes, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  stepCounter: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    ':nth-child(1) + *': {
      marginTop: sizes.largeI
    }
  },
  
  card: {
    paddingLeft: 0,
    paddingRight: 0
  },
  tableOverflow: {
    overflowX: 'scroll',
    marginTop: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  },
  table: {
    whiteSpace: 'nowrap',
    marginTop: sizes.largeIi
  },
  modalHeading: {
    textAlign: 'center'
  },
  modalBody: {
    marginTop: sizes.regular,
    textAlign: 'center'
  }
})

module.exports = styleSheet
