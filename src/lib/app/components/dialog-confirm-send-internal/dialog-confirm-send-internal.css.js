let {
  css
} = require('../../lib/css')

module.exports = css({
  dialog: {},
  dialogTitle: {},
  dialogText: {},
  dialogButtons: {},
  dialogCloseButton: {},
  dialogCancelButton: {
    color: 'red'
  },
  dialogConfirmButton: {
    color: 'green'
  }
})
