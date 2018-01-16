const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  card: {
    paddingLeft: 0,
    paddingRight: 0
  },
  form: {
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  },
  submitButton: {
    marginTop: sizes.regular
  },
  input: {
    marginTop: sizes.regular
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
  },
  form: {
    marginTop: sizes.regular
  }
})

module.exports = styleSheet
