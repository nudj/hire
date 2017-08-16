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

module.exports = css(merge(mixins.pageLayout, {
  jobLink: {
    color: variables.colors.royalBlue,
    textDecoration: 'none'
  },
  companyLink: mixins.deLink,
  submit: mixins.button,
  chunk: {},
  para: {
    lineHeight: variables.sizing.textEditorLineHeight,
    margin: `${variables.sizing.textEditorLineHeight} 0 0 0`,
    ':first-child': {
      marginTop: 0
    }
  },
  tagOk: tag,
  tagError: merge(tag, {
    background: variables.colors.lightPink,
    color: variables.colors.darkPink
  })
}))
