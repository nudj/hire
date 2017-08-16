let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const styles = {
  task: merge(mixins.cardStyle, {
    alignContent: 'center',
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 0 ${variables.padding.d} 0`
  }),
  text: merge(mixins.headings.p, {
    flexGrow: '1'
  }),
  action: mixins.button
}

module.exports = css(styles)
