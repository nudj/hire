let {
  css
} = require('../../lib/css')

module.exports = css({
  nav: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    background: '#081f2c',
    overflow: 'hidden',
    padding: '20px 0',
    color: '#fff'
  },
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },
  home: {
    display: 'inline-block'
  },
  brand: {
    maxWidth: '4rem',
    paddingTop: '.5rem'
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  menuItem: {
    textAlign: 'center'
  },
  jobs: {
    color: '#fff'
  },
  candidates: {
    color: '#fff'
  },
  help: {
    color: '#fff'
  },
  sub: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logout: {
    color: '#fff'
  }
})
