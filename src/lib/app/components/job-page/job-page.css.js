let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const cardChoiceIconSize = '46px'

const cardStyle = merge(mixins.cardStyle, {
  textAlign: 'center',
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
  nudjLink: merge({
    margin: `0 0 0 ${variables.padding.d}`
  }, mixins.button),
  pageMain: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  internal: cardStyle,
  external: cardStyle,
  internalContent: merge(cardContent, {
    ':before': {
      backgroundImage: mixins.linkImage('company.svg')
    }
  }),
  externalContent: merge(cardContent, {
    ':before': {
      backgroundImage: mixins.linkImage('network.svg')
    }
  }),
  title: merge(mixins.headings.h7, {
    color: variables.colors.royalBlue,
    marginTop: variables.padding.d,
    marginBottom: variables.padding.e
  }),
  description: merge(mixins.typography.p),
  button: merge(mixins.button, {
    display: 'inline-block'
  }),
  network: merge({}, mixins.deList, {
    padding: `0 ${variables.padding.d}`,
    width: '100%'
  }),
  resendLink: mixins.button
}))
