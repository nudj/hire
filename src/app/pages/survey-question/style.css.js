const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  stepCounter: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    ':nth-child(1) + *': {
      marginTop: sizes.largeI
    }
  },
  searchLoader: {
    height: sizes.largeV,
    marginTop: sizes.largeIi,
    paddingLeft: sizes.largeIi,
    paddingRight: sizes.largeIi
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
  },
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
  }
})

module.exports = styleSheet
