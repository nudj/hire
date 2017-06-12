let { css, merge, mixins, variables } = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
}

const activeOptionIcon = {
  display: 'inline-block',
  padding: `0 0 ${variables.padding.e} 0`
}

const optionTitle = merge(mixins.headings.h7, {
  color: variables.colors.royalBlue,
  padding: `0 0 ${variables.padding.f} 0`
})

const optionText = merge(mixins.headings.p, {
  color: variables.colors.charcoal
})

const tooltipFloating = {
  left: '0',
  position: 'absolute',
  right: '0',
  [mixins.breakpoints.l]: {
    left: `calc(${variables.padding.c} + ${variables.padding.d})`,
    right: variables.padding.d
  }
}

const styles = {
  pageContent: {
    padding: `0 0 ${variables.padding.d} 0`
  },
  companyLink: mixins.deLink,
  tooltipFloating: merge(tooltipFloating, {
    top: '0'
  }),
  tooltipFloatingBottom: merge(tooltipFloating, {
    bottom: '0'
  }),
  activeOptionsContainer: merge(nextToTitleContainer, mixins.deList, {
    display: 'flex'
  }),
  activeOption: merge(mixins.cardStyleTwo, {
    background: variables.colors.offWhite,
    flexBasis: '0',
    flexGrow: '1',
    margin: `0 0 0 ${variables.padding.e}`,
    padding: '0',
    textAlign: 'center',
    ':first-child': {
      margin: '0'
    }
  }),
  activeOptionAction: {
    color: 'inherit',
    cursor: 'pointer',
    display: 'block',
    padding: variables.padding.d,
    textDecoration: 'none'
  },
  activeOptionIcon: activeOptionIcon,
  activeOptionImage: {},
  activeOptionIconEmoji: merge({
    display: 'block'
  }, activeOptionIcon),
  activeOptionTitle: optionTitle,
  activeOptionText: optionText,
  activeContainer: merge(nextToTitleContainer),
  activeContainerCentered: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeContainerTitle: merge(optionText, {
    padding: `0 0 ${variables.padding.d} 0`
  }),
  completedSectionSummary: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  completedSectionSummaryTitle: optionTitle,
  completedSectionSummaryText: optionText,
  completedSectionSummaryMessage: {
    textAlign: 'left'
  },
  completedSectionSummaryMessageParagraph: merge(mixins.typography.p, {
    ':last-child': {
      margin: '0'
    }
  }),
  messageContainer: {
    margin: `0 0 ${variables.padding.d} 0`
  },
  messageTextarea: merge(mixins.formElements.inputBoxBorderless, {
    height: '20rem',
    padding: `0 0 ${variables.padding.d} 0`,
    width: '100%'
  }),
  tagOk: {
    color: 'green'
  },
  tagError: {
    color: 'red'
  },
  composeMessageSave: merge(mixins.button, {
    display: 'inline-block'
  }),
  nextStepNudj: merge(mixins.button, {
    display: 'inline-block'
  }),
  nextStepDashboard: merge(mixins.buttonSecondary, {
    display: 'inline-block',
    margin: `0 ${variables.padding.d} 0 0`
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
