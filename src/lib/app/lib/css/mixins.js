module.exports.pageLayout = {
  pageBody: {
    flexGrow: 1,
    background: '#ececeb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch'
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    background: '#fff',
    padding: '10px 20px'
  },
  pageHeadline: {
    padding: '20px 20px 10px',
    margin: 0
  },
  pageContent: {
    flex: 1,
    padding: '10px 20px',
    display: 'flex'
  },
  pageMain: {
    flex: 1
  },
  pageSidebar: {
    width: '420px',
    padding: '0 60px'
  }
}

module.exports.cardStyle = {
  background: '#fff',
  borderRadius: '4px',
  boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
  padding: '30px'
}

module.exports.sansSerif = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif'
}

const dimHover = {
  backfaceVisibility: 'hidden',
  opacity: '.5',
  transition: 'opacity .15s ease-in'
}
module.exports.dim = {
  opacity: 1,
  transition: 'opacity .15s ease-in',
  ':hover': dimHover,
  ':focus': dimHover,
  ':active': {
    backfaceVisibility: 'hidden',
    opacity: '.8',
    transition: 'opacity .15s ease-out'
  }
}

const visited = {
  transition: 'color .15s ease-in'
}
module.exports.link = {
  textDecoration: 'none',
  transition: 'color .15s ease-in',
  ':link': visited,
  ':visited': visited,
  ':hover': {
    transition: 'color .15s ease-in'
  },
  ':focus': {
    transition: 'color .15s ease-in',
    outline: '1px dotted currentColor'
  }
}

const growHover = {
  transform: 'scale( 1.05 )'
}
module.exports.grow = {
  backfaceVisibility: 'hidden',
  transform: 'translateZ( 0 )',
  transition: 'transform .25s ease-out',
  ':hover': growHover,
  ':focus': growHover,
  ':active': {
    transform: 'transform: scale( .90 )'
  }
}
