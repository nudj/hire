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
    justifyContent: 'center',
    padding: `${variables.padding.d} 0 0 0`
  },
  dialogCloseButton: {},
  cancelDialogButton: merge(mixins.buttonSecondary, {
    margin: `${variables.padding.f}`
  }),
  confirmDialogButton: merge(mixins.button, {
    margin: `${variables.padding.f}`
  })
})
