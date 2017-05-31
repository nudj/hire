let {
  css,
  variables
} = require('../../lib/css')

const spin = {
  '0%': {
    transform: 'scale(0)'
  },
  '100%': {
    transform: 'scale(1.0)',
    opacity: 0
  }
}

module.exports = css({
  loading: {
    background: variables.colors.grey,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  body: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    backgroundColor: variables.colors.navy,
    borderRadius: '100%',
    animationName: spin,
    animationDuration: '1.0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out'
  }
})
