let { css, merge, mixins } = require('../../lib/css')

const styles = {
  pageBody: {},
  pageHeadline: {},
  pageContent: {},
  pageMain: {},
  network: merge({}, mixins.deList),
  networkSmall: merge({
    display: 'flex',
    flexWrap: 'wrap'
  }, mixins.deList),
  pageSidebar: {}
}

module.exports = css(merge({}, mixins.pageLayout, styles))
