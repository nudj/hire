const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  task: merge(mixins.cardStyle, {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 0 ${variables.padding.d} 0`
  }),
  textContainer: {
    flexGrow: '1'
  },
  title: merge(mixins.headings.h7, {
    margin: `0 0 ${variables.padding.e} 0`
  }),
  text: mixins.headings.p,
  textDone: merge(mixins.headings.p, {
    display: 'block',
    margin: `${variables.padding.e} 0 0 0`
  }),
  action: merge(mixins.button, {
    flexShrink: '0',
    margin: `0 0 0 ${variables.padding.d}`
  })
}

styles.titleDone = merge(styles.title, {
  textDecoration: 'line-through'
})

module.exports = css(styles)
