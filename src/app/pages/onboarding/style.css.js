const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  confirmButton: merge(mixins.button, {
    margin: `0 0 0 ${variables.padding.d}`
  }),
  buttonContainer: {
    align: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${variables.padding.d} 0 0 0`
  },
  copy: merge(mixins.typography.p, {
    marginLeft: variables.padding.d,
    width: '75%'
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
