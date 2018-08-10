const { StyleSheet, sizes, colors, typography } = require('@nudj/components/lib/css')
const breakpoints = require('../../lib/css/breakpoints')

const featureTags = process.env.FEATURE_TAGS === 'true'

// TODO: Merge with survey-question/style.css.js
const rawStyleSheet = {
  resultsContainer: {
    marginTop: featureTags ? sizes.regular : sizes.smallIi,
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    width: '100%'
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
    flexShrink: 1,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular
  },
  filterContainer: {
    marginTop: sizes.smallIi,
    paddingTop: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid'
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left'
  },
  resultCount: {
    flexGrow: 1
  },
  filterButton: {
    flexShrink: 1,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    textDecoration: 'none',
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      display: 'none'
    }
  },
  filterIcon: {
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: 0
  },
  filters: {
    marginTop: sizes.regular,
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      paddingBottom: sizes.regular
    }
  },
  /**
   * <AnimateHeight /> uses inline styles to to animate the
   * reveal/hide of it's children. `!important` overrides the
   * inline styles, allowing us to force the display of the
   * filters at larger screen sizes
   */
  animatedFilterPanel: {
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      height: 'auto !important',
      overflow: 'auto !important'
    }
  },
  animatedFilterPanelInner: {
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      display: 'block !important'
    }
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
  privacyNotice: {
    marginTop: sizes.largeI,
    maxWidth: '30rem'
  },
  privacyLink: {
    ...typography.type.smallI,
    fontWeight: typography.fontWeight.bold
  }
}

if (featureTags) {
  rawStyleSheet.card = {
    width: '100%',
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      display: 'flex'
    }
  }

  rawStyleSheet.form = {
    [`@media(${breakpoints.forceShowContactFilters})`]: {
      flexBasis: '45%',
      flexShrink: 1,
      maxWidth: '24rem'
    }
  }

  rawStyleSheet.resultsContainer[`@media(${breakpoints.forceShowContactFilters})`] = {
    marginTop: 0,
    borderTopWidth: 0,
    flexGrow: 1,
    borderLeftColor: colors.greyLight,
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid'
  }
}

const styleSheet = StyleSheet.create(rawStyleSheet)

module.exports = styleSheet
