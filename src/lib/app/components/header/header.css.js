let {
  css,
  merge,
  mixins
} = require('../../lib/css')

let linkStyle = {
  width: '70px',
  height: '70px',
  display: 'block',
  padding: '10px 0',
  textDecoration: 'none',
  ':before': {
    content: '""',
    display: 'block',
    height: '30px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    marginBottom: '5px'
  }
}

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
    display: 'inline-block',
    width: '70px',
    textAlign: 'center',
    marginBottom: '30px'
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
  menuItem: merge(mixins.headings.small, {
    textAlign: 'center',
    fontSize: '10px',
    marginTop: '10px',
    ':first-child': {
      marginTop: 0
    }
  }),
  jobs: merge(linkStyle, {
    color: '#fff',
    ':before': {
      backgroundImage: 'url("/assets/images/business-24-px-outline-briefcase-24.svg")'
    }
  }),
  candidates: merge(linkStyle, {
    color: '#fff',
    ':before': {
      backgroundImage: 'url("/assets/images/business-24-px-outline-briefcase-24.svg")'
    }
  }),
  help: merge(linkStyle, {
    color: '#fff',
    ':before': {
      backgroundImage: 'url("/assets/images/ui-24-px-outline-2-alert-circle.svg")'
    }
  }),
  sub: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logout: merge(linkStyle, {
    color: '#fff',
    ':before': {
      backgroundImage: 'url("/assets/images/arrows-24-px-outline-2-circle-out.svg")'
    }
  })
})
