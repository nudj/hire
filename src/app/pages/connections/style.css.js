const { css, merge } = require('@nudj/framework/css')
const { mixins } = require('../../lib/css')

module.exports = css(
  merge(mixins.pageLayout, {
    recall: mixins.buttonSecondary,
    import: mixins.buttonSecondary,
    list: {
      margin: 0,
      padding: 0
    },
    view: mixins.button
  })
)