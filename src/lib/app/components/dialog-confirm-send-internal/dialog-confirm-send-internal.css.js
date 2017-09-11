let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

module.exports = css({
  dialog: {},
  dialogTitle: mixins.typography.h3,
  dialogText: mixins.typography.p,
  dialogButtons: {
    display: 'flex',
    padding: `${variables.padding.d} 0 0 0`
  },
  dialogCloseButton: {},
  cancelDialogButton: merge(mixins.buttonSecondary, {
    margin: `0 ${variables.padding.d} 0 0`
  }),
  confirmDialogButton: mixins.button
})
