let {
  css,
  merge,
  variables,
  mixins
} = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
}

const styles = {
  activeContainerCentered: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  messageContainer: {
    margin: `0 0 ${variables.padding.d} 0`
  },
  messageTextarea: merge(mixins.formElements.inputBoxBorderless, {
    height: '20rem',
    padding: `0 0 ${variables.padding.d} 0`,
    width: '100%'
  }),
  tagOk: {
    color: 'green'
  },
  tagError: {
    color: 'red'
  },
  composeMessageSave: merge(mixins.button, {
    display: 'inline-block'
  })
}

module.exports = css(styles)
