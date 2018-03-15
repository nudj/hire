const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

// TODO: Merge with survey-question/style.css.js
const styleSheet = StyleSheet.create({
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: sizes.smallIi,
    paddingLeft: sizes.smallIi
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    flexShrink: 1
  },
  resultsContainer: {
    marginTop: sizes.smallIi,
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid'
  },
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
  },
  messageButton: {
    paddingTop: sizes.smallI,
    paddingRight: sizes.smallI,
    paddingBottom: sizes.smallI,
    paddingLeft: sizes.smallI,
    width: '2.75rem',
    height: '2.75rem',
    lineHeight: 0,
    cursor: 'pointer'
  }
})

module.exports = styleSheet
