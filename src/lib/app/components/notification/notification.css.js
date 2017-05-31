let {
  css,
  mixins,
  merge,
  variables
} = require('../../lib/css')

module.exports = css({
  notification: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    width: '500px',
    height: '50px',
    borderRadius: '4px',
    backgroundColor: variables.colors.lightGrey,
    boxShadow: '0 2px 20px 0 rgba(45, 41, 38, 0.2)',
    position: 'absolute',
    left: '50%',
    top: '15px',
    transition: 'transform 300ms ease-in-out',
    transform: 'translateX(-50%) translateY(-80px)',
    overflow: 'hidden'
  },
  info: {
    backgroundColor: variables.colors.royalBlueFade
  },
  warn: {
    backgroundColor: variables.colors.lightYellow
  },
  error: {
    backgroundColor: variables.colors.pink
  },
  success: {
    backgroundColor: variables.colors.green
  },
  message: merge(mixins.headings.p2, {
    flex: 1,
    padding: '0 30px',
    color: variables.colors.white
  }),
  close: {
    backgroundColor: 'rgba(45, 41, 38, 0.2)',
    border: 0,
    height: '50px',
    display: 'block',
    padding: '17px',
    cursor: 'pointer',
    color: variables.colors.white,
    ':active': {
      outline: 'none',
      border: 'none'
    },
    ':focus': {
      outline: 'none',
      border: 'none'
    }
  },
  visible: {
    transform: 'translateX(-50%) translateY(0)'
  }
})
