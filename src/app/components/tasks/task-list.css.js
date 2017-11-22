const { css } = require('@nudj/framework/css')
const { variables } = require('../../lib/css')

module.exports = css({
  tasks: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  task: {
    margin: `0 0 ${variables.padding.d} 0`
  }
})
