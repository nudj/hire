let { css, sansSerif } = require('../../lib/css')

module.exports = css({
  body: Object.assign({
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    paddingLeft: '120px'
  }, sansSerif),
  header: Object.assign({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '120px',
    height: '100%'
  }, sansSerif),
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0
  }
})
