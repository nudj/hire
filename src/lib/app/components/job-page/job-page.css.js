let {
  css,
  merge,
  mixins,
  variables
} = require('../../lib/css')

const cardStyle = merge(mixins.cardStyle, {
  width: '286px',
  height: '312px',
  display: 'flex',
  marginLeft: '10px',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'center',
  ':first-child': {
    marginLeft: 0
  }
})

const cardContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  ':before': {
    content: '""',
    display: 'block',
    width: '46px',
    height: '46px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain'
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
  internalContent: merge(cardContent, {
    ':before': {
      backgroundImage: 'url("/assets/images/company.svg")'
    }
  }),
  externalContent: merge(cardContent, {
    ':before': {
      backgroundImage: 'url("/assets/images/network.svg")'
    }
  }),
  title: merge(mixins.headings.h7, {
    color: variables.colors.royalBlue,
    marginTop: '20px',
    marginBottom: '10px'
  }),
  description: merge(mixins.headings.small, {
    textAlign: 'center',
    margin: 0
  }),
  button: merge(mixins.button, {
    flex: 0
  })
}))
