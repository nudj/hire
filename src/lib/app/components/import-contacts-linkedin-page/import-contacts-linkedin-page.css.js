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
    margin: `0 0 0 ${variables.padding.d}`
  }),
  confirmButtonDisabled: merge(mixins.button, {
    margin: `0 0 0 ${variables.padding.d}`
  }),
  cancelButton: merge(mixins.buttonSecondary, {
    margin: `0 0 0 ${variables.padding.d}`
  }),
  buttonContainer: {
    align: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `0 0 ${variables.padding.d} 0`
  },
  instructionsStepContainer: merge(mixins.cardStyle, {
    margin: `0 0 ${variables.padding.d} 0`
  }),
  instructionsSteps: {
    margin: '0',
    padding: `0 0 ${variables.padding.c} 1rem`
  },
  instructionsStep: {
    padding: `0 0 ${variables.padding.e} 0`
  },
  instructionsStepHeading: merge(mixins.typography.h4),
  instructionsCopy: merge(mixins.typography.p),
  instructionsCopyLink: merge(mixins.link, {
    color: variables.colors.royalBlue
  }),
  instructionsCopyEmphasis: {},
  instructionsImage: {
    display: 'block',
    left: '-1rem',
    maxWidth: 'calc(100% + 1rem)',
    position: 'relative',
    width: 'calc(100% + 1rem)'
  },
  uploadTable: merge(mixins.table.tableFixedHeight, {
    margin: `0 0 ${variables.padding.d} 0`
  }),
  uploadTableHead: mixins.table.tableHeadFixedHeight,
  uploadTableHeader: mixins.table.tableHeaderFixedHeight,
  uploadTableBodyFixedHeight: mixins.tableBodyFixedHeight(),
  uploadTableRow: mixins.table.tableRowBodyFixedHeight,
  uploadTableCell: mixins.table.tableCellFixedHeight,
  uploadTableCellEven: mixins.table.tableCellEvenFixedHeight,
  uploadTableCellTruncateContent: {
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dragAndDrop: mixins.dragAndDrop.dragAndDrop,
  dragAndDropOk: mixins.dragAndDrop.dragAndDropOk,
  dragAndDropNotOk: mixins.dragAndDrop.dragAndDropNotOk,
  dragAndDropHeading: mixins.dragAndDrop.dragAndDropHeading,
  dragAndDropCopy: mixins.dragAndDrop.dragAndDropCopy,
  dragAndDropCopyEmphasis: mixins.dragAndDrop.dragAndDropCopyEmphasis
}

module.exports = css(merge(mixins.pageLayout, styles))
