let { css, merge, mixins } = require('../../lib/css')

const title = {
  width: '150px'
}

const nextToTitleContainer = {
  width: 'calc(100% - 150px)'
}

const sectionNumber = {
  backgroundColor: 'blue',
  borderRadius: '100%',
  color: 'white',
  display: 'inline-block',
  height: '1rem',
  lineHeight: '1rem',
  position: 'relative',
  textAlign: 'center',
  width: '1rem'
}

const styles = {
  section: {
    alignItems: 'center',
    display: 'flex'
  },
  sectionTitle: merge({}, title),
  sectionNumber: sectionNumber,
  sectionDone: merge({}, sectionNumber, {
    color: 'blue'
  }),
  preActiveText: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeOptionsContainer: merge({}, nextToTitleContainer, mixins.deList, {
    display: 'flex'
  }),
  activeOption: {
    border: '1px solid black',
    flexBasis: '0',
    flexGrow: '1',
    margin: '0 0 0 10px',
    textAlign: 'center',
    ':first-child': {
      margin: '0'
    }
  },
  activeOptionAction: {
    cursor: 'pointer',
    display: 'block',
    padding: '10px'
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
  completedSectionSummaryMessage: {
    textAlign: 'left'
  },
  messageContainer: {},
  messageTextarea: {
    height: '20rem',
    width: '100%'
  },
  tagOk: {
    color: 'green'
  },
  tagError: {
    color: 'red'
  }
}

module.exports = css(merge({}, mixins.pageLayout, styles))
