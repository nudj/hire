let { css } = require('../../lib/css')

module.exports = css({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    background: '#fff',
    padding: '10px 20px'
  },
  sub: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})
