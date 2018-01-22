const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  card: {
    paddingLeft: 0,
    paddingRight: 0
  },
  form: {
    marginTop: sizes.regular,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  },
  submitButton: {
    marginTop: sizes.regular
  },
  addPersonButton: {
    marginTop: sizes.regular,
    marginBottom: sizes.largeIi
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
  }
})

module.exports = styleSheet
