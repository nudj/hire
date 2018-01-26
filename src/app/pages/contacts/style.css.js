const { StyleSheet, sizes } = require('@nudj/components/lib/css')

// TODO: Merge with survey-question/style.css.js
const styleSheet = StyleSheet.create({
  modalHeading: {
    textAlign: 'center'
  },
  modalBody: {
    marginTop: sizes.regular,
    textAlign: 'center'
  },
  tableOverflow: {
    overflowX: 'scroll',
    marginTop: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  },
  table: {
    whiteSpace: 'nowrap'
  },
  searchLoader: {
    height: sizes.largeV,
    marginTop: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
  }
})

module.exports = styleSheet
