let { css, merge, mixins, variables } = require('../../lib/css')

const title = {
  width: '150px'
}

const nextToTitleContainer = {
  width: 'calc(100% - 150px)'
}

const sectionNumberSize = '1.25rem'

const sectionNumber = {
  backgroundColor: variables.colors.royalBlue,
  borderRadius: '100%',
  color: 'white',
  display: 'inline-block',
  height: sectionNumberSize,
  lineHeight: sectionNumberSize,
  position: 'relative',
  textAlign: 'center',
  width: sectionNumberSize
}

const styles = {
  tooltipFloating: {
    left: '30px', // These are naughty magic numbers from mixins.pageSidebar
    position: 'absolute',
    right: '60px',
    top: '0'
  },
  section: merge({
    alignItems: 'center',
    display: 'flex'
  }, mixins.cardStyle),
  sectionTitle: merge({}, title),
  sectionNumber: sectionNumber,
  sectionDone: merge({}, sectionNumber, {
    color: variables.colors.royalBlue,
    '::after': {
      backgroundImage: `url('/assets/images/ui-24px-outline-1_check.svg')`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '60%', // ABOMINATION
      content: `''`,
      display: 'block',
      height: '100%',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%'
    }
  }),
  preActiveText: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeOptionsContainer: merge({}, nextToTitleContainer, mixins.deList, {
    display: 'flex'
  }),
  activeOption: merge({
    flexBasis: '0',
    flexGrow: '1',
    margin: '0 0 0 10px',
    textAlign: 'center',
    ':first-child': {
      margin: '0'
    }
  }, mixins.cardStyleTwo),
  activeOptionAction: {
    cursor: 'pointer',
    display: 'block',
    padding: '10px'
  },
  activeOptionIcon: {
    display: 'block'
  },
  activeOptionImage: {},
  activeOptionIconEmoji: {},
  activeOptionTitle: {
    color: variables.colors.royalBlue
  },
  activeOptionText: {},
  activeContainer: merge({}, nextToTitleContainer),
  activeContainerCentered: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeContainerTitle: {},
  completedSectionSummary: merge({}, nextToTitleContainer, {
    textAlign: 'center'
  }),
  completedSectionSummaryTitle: {
    color: variables.colors.royalBlue
  },
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
  },
  composeMessageSave: merge({}, mixins.button, {
    display: 'inline-block'
  }),
  nextStepNudj: merge({}, mixins.button, {
    display: 'inline-block'
  }),
  nextStepDashboard: merge({}, mixins.buttonSecondary, {
    display: 'inline-block',
    margin: '0 20px 0 0'
  })
}

module.exports = css(merge({}, mixins.pageLayout, styles))
