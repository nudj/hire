let {
  css,
  mixins,
  merge
} = require('../../lib/css')

module.exports = css({
  tooltip: mixins.cardStyle,
  tooltipTitle: merge(mixins.headings.h7, {
    marginTop: 0
  }),
  tooltipIntercomButton: mixins.buttonTertiary
})
