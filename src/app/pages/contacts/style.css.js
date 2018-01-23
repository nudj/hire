const { StyleSheet, sizes } = require('@nudj/components/lib/css')

// TODO: Merge with survey-question/style.css.js
const styleSheet = StyleSheet.create({
  card: {
    paddingLeft: 0,
    paddingRight: 0
  },
  addPersonButton: {
    marginTop: sizes.regular,
    marginBottom: sizes.largeIi
  },
  modalHeading: {
    textAlign: 'center'
  },
  modalBody: {
    marginTop: sizes.regular,
    textAlign: 'center'
  },
  modalWindow: {
    height: 'auto'
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
    whiteSpace: 'nowrap'
  }
})

module.exports = styleSheet
