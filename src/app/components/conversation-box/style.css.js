const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const styles = {
  conversationBox: {
    backgroundColor: variables.colors.white,
    borderRadius: variables.sizing.baseBorderRadius,
    height: '70vh',
    position: 'relative',
    padding: variables.padding.de
  },
  messageInput: {
    borderTop: '2px solid black',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: variables.padding.d
  },
  userMessage: merge(mixins.typography.p, {
    padding: '10px 20px',
    borderRadius: variables.sizing.messageBorderRadius,
    backgroundColor: '#429aff',
    float: 'right',
    display: 'inline-block',
    maxWidth: '50%',
    color: variables.colors.white,
    margin: '10px'
  }),
  recipientMessage: merge(mixins.typography.p, {
    padding: '10px 20px',
    borderRadius: '6px',
    display: 'inline-block',
    maxWidth: '60%',
    color: variables.colors.white,
    margin: '10px'
  }),
  messageContainer: {
    overflow: 'hidden'
  },
  conversationParagraph: merge(mixins.typography.p, {
    fontWeight: 'bold',
    ':last-child': {
      margin: '0'
    }
  }),
  confirmButton: merge(mixins.button, {
    margin: `0 ${variables.padding.e}`
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
