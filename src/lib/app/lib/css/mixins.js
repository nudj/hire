const { merge } = require('../../../lib')
const variables = require('./variables')

module.exports.variables = variables

const breakpoints = {
  ns: `@media screen and (min-width: ${variables.breakpoints.medium})`,
  l: `@media screen and (min-width: ${variables.breakpoints.large})`
}
module.exports.breakpoints = breakpoints

// Fonts
function createFontFamily (name, properties) {
  const fontFamily = name
  const src = `url('${variables.assets.fonts}${properties.files.eot}?#iefix') format('embedded-opentype'),
    url('${variables.assets.fonts}${properties.files.woff}') format('woff'),
    url('${variables.assets.fonts}${properties.files.woff2}') format('woff2'),
    url('${variables.assets.fonts}${properties.files.ttf}') format('truetype')`
  const fontStyle = `${properties.style}`
  const fontWeight = `${properties.weight}`

  return {fontFamily, fontStyle, fontWeight, src}
}

function createFont (name, font) {
  const fontFamilies = {}
  for (let variation in font) {
    const newName = `${name}-${variation}`
    fontFamilies[variation] = createFontFamily(newName, font[variation])
  }
  return fontFamilies
}

const fonts = {
  jan: createFont('jan', variables.fonts.jan)
}

const headings = {
  h1: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f2,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f1
    }
  },
  h2: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f3,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f2
    }
  },
  h3: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f4,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f3
    }
  },
  h4: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f5,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  },
  h4Light: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f5,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f4
    }
  },
  h5: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f6,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f5
    }
  },
  h6: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f7,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f6
    }
  },
  h7: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f8,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f7
    }
  },
  h8: {
    fontFamily: [fonts.jan.bold],
    fontSize: variables.fontSizes.f8,
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f8
    }
  },
  p: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f6,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f7
    }
  },
  p2: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f7,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f8
    }
  },
  small: {
    fontFamily: [fonts.jan.light],
    fontSize: variables.fontSizes.f9,
    fontWeight: 'normal',
    [breakpoints.ns]: {
      fontSize: variables.fontSizes.f9
    }
  }
}

headings.pBold = merge({}, headings.p, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

headings.p2Bold = merge({}, headings.p2, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

module.exports.headings = headings

module.exports.pageLayout = {
  pageBody: merge(headings.p, {
    flexGrow: 1,
    background: variables.colors.grey,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch'
  }),
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    background: variables.colors.white,
    padding: '10px 20px'
  },
  pageHeadline: merge(headings.h5, {
    color: variables.colors.royalBlue,
    padding: '30px',
    margin: 0
  }),
  pageContent: {
    flex: 1,
    padding: '0 0 30px',
    display: 'flex'
  },
  pageMain: {
    flex: 1,
    padding: '0 30px'
  },
  pageSidebar: {
    width: '420px',
    padding: '0 60px 0 30px',
    position: 'relative'
  }
}

const cardStyle = {
  background: variables.colors.white,
  borderRadius: '4px',
  boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
  padding: '30px'
}

module.exports.cardStyle = cardStyle

module.exports.cardStyleTwo = merge({}, cardStyle, {
  background: variables.colors.grey
})

module.exports.sansSerif = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif'
}

const dimHover = {
  backfaceVisibility: 'hidden',
  opacity: '.5',
  transition: 'opacity .15s ease-in'
}
module.exports.dim = {
  opacity: 1,
  transition: 'opacity .15s ease-in',
  ':hover': dimHover,
  ':focus': dimHover,
  ':active': {
    backfaceVisibility: 'hidden',
    opacity: '.8',
    transition: 'opacity .15s ease-out'
  }
}

const visited = {
  transition: 'color .15s ease-in'
}
module.exports.link = {
  textDecoration: 'none',
  transition: 'color .15s ease-in',
  ':link': visited,
  ':visited': visited,
  ':hover': {
    transition: 'color .15s ease-in'
  },
  ':focus': {
    transition: 'color .15s ease-in',
    outline: '1px dotted currentColor'
  }
}

const growHover = {
  transform: 'scale( 1.05 )'
}
module.exports.grow = {
  backfaceVisibility: 'hidden',
  transform: 'translateZ( 0 )',
  transition: 'transform .25s ease-out',
  ':hover': growHover,
  ':focus': growHover,
  ':active': {
    transform: 'transform: scale( .90 )'
  }
}

module.exports.deList = {
  listStyle: 'none',
  margin: '0',
  padding: '0'
}

module.exports.button = merge(headings.pBold, {
  display: 'block',
  height: '40px',
  border: 0,
  borderRadius: '40px',
  backgroundColor: variables.colors.royalBlue,
  color: variables.colors.white,
  padding: '10px 30px',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  ':disabled': {
    backgroundColor: variables.colors.royalBlueFade,
    cursor: 'default'
  }
})
module.exports.buttonSecondary = merge(module.exports.button, {
  color: variables.colors.royalBlue,
  backgroundColor: variables.colors.white,
  border: `2px solid ${variables.colors.royalBlue}`,
  ':disabled': {
    color: variables.colors.royalBlueFade,
    borderColor: variables.colors.royalBlueFade,
    cursor: 'default'
  }
})
module.exports.buttonTertiary = merge(module.exports.button, {
  color: variables.colors.charcoal,
  backgroundColor: variables.colors.grey
})
