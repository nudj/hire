import css, {
  sansSerif,
  link,
  grow,
  breakpoints,
  merge
} from '../../lib/css'

export default css({
  body: merge({
    color: 'black'
  }, sansSerif),
  background: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: 'url(/assets/images/office-space-2.jpg)'
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    minHeight: 'calc(100vh - 70px)'
  },
  heroBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '64rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '4rem 1rem',
    flex: 1,
    [breakpoints.ns]: {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
    margin: 0,
    padding: '.5rem',
    [breakpoints.l]: {
      fontSize: '3rem'
    }
  },
  subtitle: {
    fontSize: '1.5rem',
    padding: '0 .5rem 2rem',
    margin: 0,
    textAlign: 'center',
    [breakpoints.ns]: {
      padding: '0 4rem 4rem'
    }
  },
  break: {
    display: 'none',
    [breakpoints.ns]: {
      display: 'inline'
    }
  },
  heroFooter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0
  },
  indicator: {
    fontSize: '2.25rem',
    textAlign: 'center',
    paddingBottom: '1rem'
  },
  sectionMedium: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '64rem',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '2rem 1rem',
    [breakpoints.l]: {
      paddingTop: '4rem',
      paddingBottom: '4rem'
    }
  },
  howItWorks: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '32rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: '.5rem',
    paddingRight: '.5rem'
  },
  number: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'left'
  },
  step: {
    lineHeight: '1.5',
    textAlign: 'left'
  },
  compare: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  table: {
    fontSize: '.875rem',
    width: '100%',
    maxWidth: '64rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderSpacing: 0
  },
  tableHeader: {
    fontSize: '1.5rem',
    borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    textAlign: 'center'
  },
  tableHeaderNudj: {
    fontSize: '1.5rem',
    borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    textAlign: 'center',
    color: '#ff725c'
  },
  tableBody: {
    lineHeight: '1.5'
  },
  tableLeft: {
    fontSize: '1rem',
    borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
    paddingTop: '.5rem',
    paddingBottom: '.5rem'
  },
  tableItem: {
    fontSize: '1.25rem',
    borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    textAlign: 'center'
  },
  tableItemNudj: {
    fontSize: '1.25rem',
    borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    textAlign: 'center',
    color: '#ff725c'
  },
  beta: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '64rem',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  bodyNudj: {
    fontSize: '1.25rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center',
    color: '#ff725c',
    [breakpoints.l]: {
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }
  },
  brand: {
    textAlign: 'center',
    width: '100%',
    [breakpoints.ns]: {
      width: '33%'
    }
  },
  backgroundFooter: {
    backgroundColor: '#001b44',
    color: 'white'
  },
  cost: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '64rem'
  },
  pricing: {
    paddingTop: '.5rem',
    paddingBottom: '.5rem'
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '1.25',
    [breakpoints.l]: {
      fontSize: '2.25rem'
    }
  },
  detail: {
    lineHeight: '1.5',
    textAlign: 'center'
  },
  buttons: {
    textAlign: 'center',
    padding: '1rem'
  },
  request: merge({
    fontSize: '1rem',
    display: 'inline-block',
    padding: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
    borderRadius: '.25rem',
    border: '.125rem solid #ff725c',
    background: '#ff725c'
  }, link, grow),
  padding: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    display: 'block',
    [breakpoints.ns]: {
      display: 'inline-block',
      padding: '1rem'
    }
  },
  outlined: merge({
    fontSize: '1rem',
    display: 'inline-block',
    padding: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '.25rem',
    border: '.125rem solid #ff725c',
    color: 'white'
  }, link, grow)
})
