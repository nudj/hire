const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

module.exports = css({
  dialog: {},
  title: mixins.typography.h3,
  text: mixins.typography.p,
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${variables.padding.d} 0 0 0`
  },
  closeButton: {},
  cancel: merge(mixins.buttonSecondary, {
    margin: `${variables.padding.f}`
  }),
  confirm: merge(mixins.button, {
    margin: `${variables.padding.f}`
  })
})
