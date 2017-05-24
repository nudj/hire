let {
  css,
  merge,
  mixins
} = require('../../lib/css')

const tag = {
  background: 'lightgreen',
  border: '1px solid green',
  borderRadius: '1rem',
  padding: '2px 8px'
}
const fieldStyle = {
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'center'
}

module.exports = css(merge(mixins.pageLayout, {
  tagOk: tag,
  tagError: merge(tag, {
    background: 'pink',
    borderColor: 'red'
  }),
  recipientsWrap: merge(mixins.cardStyle, fieldStyle, {
    height: '100px',
    border: 0,
    margin: '0 0 10px'
  }),
  addLabel: {
    width: '120px',
    paddingRight: '20px'
  },
  recipients: {
  },
  email: merge(mixins.cardStyle, {
  }),
  subjectWrap: merge(fieldStyle, {
    borderBottom: '1px solid gray',
    paddingBottom: '30px'
  }),
  subject: {
    width: '100%',
    display: 'block'
  },
  messageWrap: merge(fieldStyle, {
    paddingTop: '30px',
    alignItems: 'flex-start'
  }),
  message: {
    width: '100%',
    height: '20rem'
  },
  errorLabel: {
    color: 'red'
  }
}))
