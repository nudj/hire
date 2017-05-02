import css, {
  breakpoints,
  merge
} from '../../lib/css'

let messageStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  color: 'white',
}

export default css({
  wrapper: {
    width: '100%',
    flex: 'none',
  },
  primary: merge({
    backgroundColor: '#111',
  }, messageStyle),
  info: merge({
    backgroundColor: '#00449e',
  }, messageStyle),
  warning: merge({
    backgroundColor: '#ffb700',
  }, messageStyle),
  error: merge({
    backgroundColor: '#e7040f',
  }, messageStyle),
  success: merge({
    backgroundColor: '#19a974',
  }, messageStyle),
  copy: {
    fontSize: '.875rem',
    lineHeight: 1.25,
    [breakpoints.ns]: {
      fontSize: '1rem',
    }
  }
})
