let {
  css,
  mixins,
  merge
} = require('../../lib/css')

module.exports = css({
  background: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(45, 41, 38, 0.4)',
    cursor: 'pointer'
  },
  hidden: {
    display: 'none'
  },
  dialog: merge(mixins.cardStyle, {
    cursor: 'auto',
    position: 'relative',
    backgroundImage: 'url("/assets/images/ok-hand.svg")',
    width: '500px',
    minHeight: '340px',
    backgroundPosition: 'calc(100% - 30px) bottom',
    backgroundRepeat: 'no-repeat',
    padding: '30px 30px 100px'
  }),
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px'
  }
})
