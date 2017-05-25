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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    ':before': {
      content: '""',
      display: 'block',
      backgroundImage: 'url("/assets/images/arrows-24-px-outline-2-circle-out.svg")',
      width: '60px',
      height: '60px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    },
  },
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
