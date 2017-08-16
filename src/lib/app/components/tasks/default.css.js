let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const styles = {
  task: merge(mixins.cardStyle, {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 0 ${variables.padding.d} 0`
  }),
  text: merge(mixins.headings.p, {
    flexGrow: '1'
  }),
  textDone: {
    display: 'block',
    textDecoration: 'line-through'
  },
  completedText: {
    display: 'block',
    margin: `${variables.padding.e} 0 0 0`
  },
  action: mixins.button
}

module.exports = css(styles)
