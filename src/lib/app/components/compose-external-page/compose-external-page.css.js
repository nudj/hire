let { css, merge, mixins } = require('../../lib/css')

const title = {
  padding: '0 0 0 50px',
  width: '100px'
}

const nextToTitleContainer = {
  width: 'calc(100% - 100px - 50px)'
}

const styles = {
  section: {
    alignItems: 'center',
    display: 'flex'
  },
  sectionTitle: merge({}, title),
  preActiveText: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeOptionsContainer: merge({}, nextToTitleContainer, mixins.deList, {
    display: 'flex'
  }),
  activeOption: {
    flexBasis: '0',
    flexGrow: '1',
    textAlign: 'center'
  },
  activeOptionAction: {
    cursor: 'pointer',
    display: 'block'
  },
  activeOptionIcon: {},
  activeOptionIconEmoji: {},
  activeOptionTitle: {},
  activeOptionText: {},
  activeContainer: merge({}, nextToTitleContainer),
  activeContainerTitle: {},
  completedSectionSummary: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  completedSectionSummaryTitle: {},
  completedSectionSummaryText: {},
  completedSectionSummaryMessage: {}
}

module.exports = css(merge({}, mixins.pageLayout, styles))
