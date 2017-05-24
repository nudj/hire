let {
  css,
  merge,
  mixins
} = require('../../lib/css')

module.exports = css({
  body: merge({
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    paddingLeft: '120px'
  }, mixins.sansSerif),
  header: merge({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '120px',
    height: '100%'
  }, mixins.sansSerif),
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0
  }
})
