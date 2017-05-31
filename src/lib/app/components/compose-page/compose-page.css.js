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
    height: variables.padding.b,
    border: '0',
    margin: `0 0 ${variables.padding.e}`
  }),
  addLabel: merge(mixins.headings.h7, {
    color: variables.colors.royalBlue,
    flexShrink: '0',
    paddingRight: variables.padding.d,
    width: variables.padding.a
  }),
  recipients: merge({
    flexGrow: '1'
  }, mixins.formElements.inputBoxBorderless),
  email: merge(mixins.cardStyle, {
  }),
  subjectWrap: merge(fieldStyle, {
    borderBottom: `${variables.sizing.baseBorderWidth} solid ${variables.colors.grey}`,
    paddingBottom: variables.padding.d
  }),
  subject: merge(mixins.formElements.inputBoxBorderless, mixins.headings.h4, {
    color: variables.colors.royalBlue,
    flexGrow: '1'
  }),
  editButton: mixins.buttonTertiary,
  doneButton: mixins.button,
  templateWrap: merge(fieldStyle, {
    alignItems: 'flex-start',
    paddingTop: variables.padding.d
  }),
  template: merge(mixins.formElements.inputBoxBorderless, {
    height: '20rem',
    flexGrow: '1',
    padding: `0 0 ${variables.padding.d} 0`
  }),
  errorLabel: {
    color: variables.colors.midRed
  }
}))
