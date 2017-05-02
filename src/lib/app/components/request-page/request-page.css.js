import css, {
  dim,
  link,
  sansSerif,
  breakpoints,
  merge
} from '../../lib/css'

export default css({
  body: merge({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }, sansSerif),
  content: {
    width: '100%',
    maxWidth: '32rem',
    margin: '0 auto',
    padding: '2rem 1rem',
    textAlign: 'center',
    [breakpoints.ns]: {
      padding: '4rem 0'
    }
  },
  formHeader: {
    paddingBottom: 0,
    borderBottom: '0.125rem solid #f4f4f4',
    [breakpoints.ns]: {
      paddingBottom: '0.5rem'
    }
  },
  title: {
    fontSize: '3rem',
    fontWeight: 500,
    margin: '1rem 0',
    textAlign: 'left',
    [breakpoints.l]: {
      fontSize: '2.25rem'
    }
  },
  subtitle: {
    fontSize: '1rem',
    textAlign: 'left',
    [breakpoints.l]: {
      fontSize: '1.25rem'
    }
  },
  fieldSet: {
    border: '1px solid transparent',
    padding: 0,
    margin: 0
  },
  fieldWrap: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  fieldLabel: {
    display: 'block',
    textAlign: 'left',
    fontSize: '.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
    paddingBottom: '0.25rem'
  },
  fieldInput: {
    padding: '0.5rem',
    border: '1px solid',
    width: '100%',
    backgroundColor: 'transparent',
    appearance: 'none'
  },
  fieldSubmit: merge({
    fontSize: '1rem',
    display: 'inline-block',
    padding: '1rem',
    textDecoration: 'none',
    color: 'white',
    border: '0.125rem solid #ff725c',
    borderRadius: '.25rem',
    backgroundColor: '#ff725c'
  }, dim, link),
  successHeader: {
    fontWeight: 600,
    fontSize: '1.5rem'
  },
  successCopy: {
    fontSize: '1rem'
  }
})
