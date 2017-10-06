let { css, merge, mixins, variables } = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
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
  jobLink: {
    color: variables.colors.royalBlue,
    textDecoration: 'none'
  },
  companyLink: mixins.deLink,
  tooltipFloating: merge(tooltipFloating, {
    top: '0'
  }),
  tooltipFloatingBottom: merge(tooltipFloating, {
    bottom: '0'
  }),
  activeContainer: merge(nextToTitleContainer),
  activeContainerCentered: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeContainerTitle: merge(optionText, {
    padding: `0 0 ${variables.padding.d} 0`
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
  confirm: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  confirmTitle: optionTitle,
  confirmText: optionText,
  confirmActions: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${variables.padding.d} 0 0`
  },
  confirmButton: merge(mixins.button, {
    margin: `0 ${variables.padding.e}`
  }),
  cancelButton: merge(mixins.buttonSecondary, {
    margin: `0 ${variables.padding.e}`
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
