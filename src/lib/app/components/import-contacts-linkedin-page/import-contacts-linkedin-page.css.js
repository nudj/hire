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
    padding: `${variables.padding.d} 0 0 0`
  },
  instructionsCard: merge(mixins.cardStyle, {
    position: 'relative'
  }),
  instructionsStepContainer: {
    margin: `0 0 ${variables.padding.d} 0`
  },
  instructionsStepCard: merge(mixins.cardStyle, {
    margin: `0 0 ${variables.padding.d} 0`
  }),
  instructionsGroup: {
    alignItems: 'flex-start',
    display: 'flex',
    margin: `0 0 ${variables.padding.d} 0`
  },
  instructionsSteps: {
    flexGrow: '1',
    margin: '0',
    padding: `0 0 ${variables.padding.c} 1rem`
  },
  instructionsStep: {
    padding: `0 0 ${variables.padding.e} 0`
  },
  instructionsStepHeading: merge(mixins.typography.h6),
  instructionsMajorHeading: merge(mixins.typography.h6),
  instructionsCopy: merge(mixins.typography.p),
  instructionsCopyLink: merge(mixins.headings.pBold, {
    color: variables.colors.royalBlue,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }),
  instructionsCopyEmphasis: {},
  instructionsImage: {
    display: 'block',
    margin: `calc(${variables.padding.f} * -1) 0 0 calc(${variables.padding.f} * -1)`,
    padding: `0 ${variables.padding.e} 0 0`,
    width: '50%'
  },
  uploadPreview: {},
  uploadPreviewUploading: {
    opacity: '0.5',
    pointerEvents: 'none'
  },
  uploadTable: mixins.table.tableFixedHeight,
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
  loadingOverlay: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%'
  },
  dragAndDrop: mixins.dragAndDrop.dragAndDrop,
  dragAndDropOk: mixins.dragAndDrop.dragAndDropOk,
  dragAndDropNotOk: mixins.dragAndDrop.dragAndDropNotOk,
  dragAndDropHeading: mixins.dragAndDrop.dragAndDropHeading,
  dragAndDropCopy: mixins.dragAndDrop.dragAndDropCopy,
  dragAndDropFakeLink: mixins.dragAndDrop.dragAndDropFakeLink,
  dragAndDropCopyEmphasis: mixins.dragAndDrop.dragAndDropCopyEmphasis,
  highlight: mixins.highlightColour,
  copy: merge(mixins.typography.p, {
    marginLeft: variables.padding.d,
    width: '75%'
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
