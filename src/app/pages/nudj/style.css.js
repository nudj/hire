const { css, merge } = require('@nudj/framework/css')
const { mixins, variables } = require('../../lib/css')

const cardChoiceIconSize = '46px'

const cardStyle = merge(mixins.cardStyle, {
  textAlign: 'center',
  maxWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: variables.padding.d,
  marginLeft: variables.padding.e,
  ':first-child': {
    marginLeft: 0
  }
})

const cardContent = {
  ':before': {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    content: `''`,
    display: 'inline-block',
    height: cardChoiceIconSize,
    width: cardChoiceIconSize
  }
}

module.exports = css(merge(mixins.pageLayout, {
  headerLink: {
    color: variables.colors.charcoal,
    textDecoration: 'none'
  },
  copyLink: mixins.buttonSecondary,
  pageMain: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  internal: cardStyle,
  external: cardStyle,
  copy: cardStyle,
  internalContent: merge(cardContent, {
    ':before': {
      backgroundImage: mixins.linkImage('newsletter.svg')
    }
  }),
  externalContent: merge(cardContent, {
    ':before': {
      backgroundImage: mixins.linkImage('network-2.svg')
    }
  }),
  copyContent: merge(cardContent, {
    ':before': {
      backgroundImage: mixins.linkImage('attach-87.svg')
    }
  }),
  title: merge(mixins.headings.h7, {
    color: variables.colors.royalBlue,
    marginTop: variables.padding.d,
    marginBottom: variables.padding.e
  }),
  description: merge(mixins.typography.p),
  button: merge(mixins.button, {
    maxWidth: '250px',
    textAlign: 'center'
  })
}))
