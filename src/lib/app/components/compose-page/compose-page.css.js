let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const tag = {
  color: variables.colors.royalBlue,
  background: variables.colors.grey,
  borderRadius: '4px',
  padding: '2px 8px',
  whiteSpace: 'nowrap'
}
const fieldStyle = {
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'center'
}

module.exports = css(merge(mixins.pageLayout, {
  jobLink: {
    color: variables.colors.royalBlue,
    textDecoration: 'none'
  },
  companyLink: {
    color: variables.colors.charcoal,
    textDecoration: 'none'
  },
  submit: mixins.button,
  chunk: {},
  para: {
    lineHeight: '1.5rem',
    ':first-child': {
      margin: 0
    }
  },
  tagOk: tag,
  tagError: merge(tag, {
    background: variables.colors.lightPink,
    color: variables.colors.darkPink
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
  editing: mixins.buttonTertiary,
  templateWrap: merge(fieldStyle, {
    paddingTop: '30px',
    alignItems: 'flex-start'
  }),
  template: {
    width: '100%',
    height: '20rem'
  },
  errorLabel: {
    color: 'red'
  }
}))
