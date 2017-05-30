let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const tag = {
  color: variables.colors.royalBlue,
  background: variables.colors.grey,
  borderRadius: variables.sizing.baseBorderRadius,
  padding: `${variables.sizing.baseBorderWidth} calc(${variables.sizing.baseBorderWidth} * 4)`,
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
  companyLink: mixins.deLink,
  submit: mixins.button,
  chunk: {},
  para: {
    lineHeight: '1.5rem',
    margin: `0 0 ${variables.padding.e} 0`
  },
  tagOk: tag,
  tagError: merge(tag, {
    background: variables.colors.lightPink,
    color: variables.colors.darkPink
  }),
  recipientsWrap: merge(mixins.cardStyle, fieldStyle, {
    height: '100px', // ?
    border: 0,
    margin: `0 0 ${variables.padding.e}`
  }),
  addLabel: {
    width: '120px', // ?
    paddingRight: variables.padding.d
  },
  recipients: {
  },
  email: merge(mixins.cardStyle, {
  }),
  subjectWrap: merge(fieldStyle, {
    borderBottom: `${variables.sizing.baseBorderWidth} solid ${variables.colors.grey}`,
    paddingBottom: variables.padding.d
  }),
  subject: {
    width: '100%',
    display: 'block'
  },
  editing: mixins.buttonTertiary,
  templateWrap: merge(fieldStyle, {
    alignItems: 'flex-start',
    paddingTop: variables.padding.d
  }),
  template: {
    width: '100%',
    height: '20rem'
  },
  errorLabel: {
    color: variables.colors.midRed
  }
}))
