import css, {
  dim,
  link,
  grow,
  breakpoints,
  merge
} from '../../lib/css'

let textLink = merge({
  fontSize: '.875rem',
  padding: '1rem',
  color: '#001b44',
  display: 'inline-block',
  textAlign: 'center',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  },
  ':focus': {
    textDecoration: 'underline'
  },
  [breakpoints.l]: {
    display: 'inline-block',
    fontSize: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
}, dim, link)

export default css({
  nav: {
    width: '100%',
    maxWidth: '64rem',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    [breakpoints.ns]: {
      flexDirection: 'row',
      paddingTop: '1rem',
      paddingBottom: '1rem'
    }
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
    [breakpoints.ns]: {
      justifyContent: 'space-between'
    }
  },
  home: {
    display: 'inline-block'
  },
  brand: {
    maxWidth: '4rem',
    paddingTop: '.5rem'
  },
  right: {
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    [breakpoints.ns]: {
      justifyContent: 'flex-end'
    }
  },
  link: textLink,
  learnMore: merge({}, textLink, {
    display: 'none'
  }),
  request: merge({
    fontSize: '1rem',
    display: 'none',
    padding: '1rem',
    textDecoration: 'none',
    color: 'white',
    borderRadius: '.25rem',
    border: '.125rem solid #ff725c',
    background: '#ff725c',
    [breakpoints.l]: {
      display: 'inline-block',
      marginLeft: '1rem'
    }
  }, link, grow)
})
