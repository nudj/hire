let { css, sansSerif } = require('../../lib/css')

module.exports = css({
  body: Object.assign({
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }, sansSerif),
  header: Object.assign({
    width: '100%',
    flex: 'none',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }, sansSerif),
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0
  },
  footer: Object.assign({
    width: '100%',
    flex: 'none'
  }, sansSerif)
})
