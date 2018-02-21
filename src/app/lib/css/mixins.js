const { merge } = require('@nudj/library')
const variables = require('./variables')

module.exports.variables = variables

const breakpoints = {
  ns: `@media screen and (min-width: ${variables.breakpoints.notSmall})`,
  m: `@media screen and (min-width: ${variables.breakpoints.medium})`,
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

headings.pBold = merge(headings.p, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

headings.p2Bold = merge(headings.p2, {
  fontFamily: [fonts.jan.bold],
  fontWeight: 'bold'
})

module.exports.headings = headings

module.exports.typography = {
  h1: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h1),
  h2: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h2),
  h3: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h3),
  h4: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h4),
  h5: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h5),
  h6: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h6),
  h7: merge({
    color: variables.colors.royalBlue,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.h7),
  p: merge({
    color: variables.colors.charcoal,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.p),
  p2: merge({
    color: variables.colors.charcoal,
    margin: `0 0 ${variables.padding.d} 0`
  }, headings.p2)
}

const linkImage = function (imagePath) {
  return `url('${variables.assets.images}${imagePath}')`
}

module.exports.linkImage = linkImage

module.exports.pageLayout = {
  pageBody: merge(headings.p, {
    background: variables.colors.grey,
    minHeight: '100vh'
  }),
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    background: variables.colors.white,
    padding: `${variables.padding.e} ${variables.padding.d}`
  },
  pageHeadline: merge(headings.h5, {
    color: variables.colors.royalBlue,
    padding: `${variables.padding.c} ${variables.padding.d} ${variables.padding.d} ${variables.padding.d}`,
    margin: 0
  }),
  pageContent: {
    flex: 1,
    padding: `0 0 ${variables.padding.c} 0`,
    display: 'flex'
  },
  pageMain: {
    flex: 1,
    padding: `0 ${variables.padding.d}`,
    minWidth: '520px'
  },
  pageSidebar: {
    boxSizing: 'content-box',
    display: 'none',
    padding: '0',
    position: 'relative',
    [breakpoints.m]: {
      display: 'block',
      width: variables.sizing.squishedSidebarWidth
    },
    [breakpoints.l]: {
      padding: `0 ${variables.padding.d} 0 calc(${variables.padding.c} + ${variables.padding.d})`,
      width: variables.sizing.sidebarWidth
    }
  }
}

const cardStyle = {
  background: variables.colors.white,
  borderRadius: variables.sizing.baseBorderRadius,
  boxShadow: `${variables.sizing.genericBoxShadow} ${variables.colors.genericBoxShadow}`,
  padding: variables.padding.d
}

module.exports.cardStyle = cardStyle

module.exports.cardStyleTwo = merge(cardStyle, {
  background: variables.colors.offGrey,
  border: `${variables.sizing.baseBorderWidth} solid ${variables.colors.midGrey}`
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

module.exports.deLink = {
  color: 'inherit',
  textDecoration: 'none'
}

module.exports.button = merge(headings.pBold, {
  border: `${variables.sizing.buttonBorderWidth} solid ${variables.colors.royalBlue}`,
  borderRadius: variables.sizing.buttonBorderRadius,
  backgroundColor: variables.colors.royalBlue,
  color: variables.colors.white,
  cursor: 'pointer',
  display: 'block',
  padding: `${variables.padding.e} ${variables.padding.d}`,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  minWidth: variables.sizing.buttonMinWidth,
  textAlign: 'center',
  ':disabled': {
    backgroundColor: variables.colors.royalBlueFade,
    borderColor: variables.colors.royalBlueFade,
    cursor: 'default'
  },
  ':focus': {
    outline: 'none'
  }
})

module.exports.buttonSecondary = merge(module.exports.button, {
  color: variables.colors.royalBlue,
  backgroundColor: variables.colors.white,
  border: `${variables.sizing.buttonBorderWidth} solid ${variables.colors.royalBlue}`,
  ':disabled': {
    color: variables.colors.royalBlueFade,
    borderColor: variables.colors.royalBlueFade,
    cursor: 'default'
  }
})

module.exports.buttonTertiary = merge(module.exports.button, {
  color: variables.colors.charcoal,
  backgroundColor: variables.colors.grey,
  borderColor: variables.colors.grey
})

module.exports.buttonClose = {
  backgroundColor: 'transparent',
  backgroundImage: linkImage('close-icon.svg'),
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  cursor: 'pointer',
  height: variables.padding.d,
  outline: 'none',
  position: 'absolute',
  right: variables.padding.e,
  top: variables.padding.e,
  width: variables.padding.d
}

const inputBox = merge(headings.p, {
  border: `calc(${variables.sizing.baseBorderWidth} * 0.5) solid ${variables.colors.midGrey}`,
  borderRadius: `calc(${variables.sizing.baseBorderRadius} * 0.5)`,
  color: variables.colors.charcoal,
  outline: 'none',
  padding: variables.padding.e,
  ':placeholder-shown': {
    color: variables.colors.midGrey
  },
  ':focus': {
    borderColor: variables.colors.royalBlue,
    boxShadow: `${variables.sizing.genericBoxShadow} ${variables.colors.genericBoxShadow}`,
    color: variables.colors.royalBlue,
    outline: 'none'
  }
})

module.exports.formElements = {
  inputBox: inputBox,
  inputBoxBorderless: merge(inputBox, {
    border: '0',
    boxShadow: 'none',
    padding: `${variables.padding.e} ${variables.padding.e} ${variables.padding.e} 0`,
    ':focus': {
      border: '0',
      boxShadow: 'none'
    }
  })
}

module.exports.sectionDivider = {
  backgroundColor: variables.colors.midGrey,
  border: 'none',
  color: variables.colors.midGrey,
  height: variables.sizing.baseBorderWidth,
  margin: `0 ${variables.padding.d} 0 ${variables.padding.d}`
}

module.exports.table = {
  table: {
    borderCollapse: 'collapse',
    margin: `0 0 ${variables.padding.d} 0`
  },
  tableHeader: merge(module.exports.headings.pBold, {
    background: variables.colors.royalBlue,
    color: variables.colors.white,
    padding: variables.padding.e,
    textAlign: 'left'
  }),
  tableRow: {},
  tableCell: merge(module.exports.headings.p, {
    background: variables.colors.white,
    borderBottom: `${variables.sizing.detailSeparatorWidth} solid ${variables.colors.lightGrey}`,
    colors: variables.colors.charcoal,
    padding: `${variables.padding.d} ${variables.padding.e}`
  })
}

module.exports.table.tableCellEven = merge(module.exports.table.tableCell, {
  background: variables.colors.lighterGrey
})

// Fixed height body extras - this displays the table as block
function tableBodyFixedHeight (fixedHeight = `calc(${variables.padding.a} * 2)`) {
  return {
    display: 'block',
    maxHeight: fixedHeight,
    overflowY: 'scroll'
  }
}

module.exports.tableBodyFixedHeight = tableBodyFixedHeight

module.exports.table.tableFixedHeight = merge(module.exports.table.table, {
  display: 'block',
  tableLayout: 'fixed',
  width: '100%'
})

module.exports.table.tableRowBodyFixedHeight = {
  display: 'flex'
}

module.exports.table.tableHeadFixedHeight = {
  display: 'block'
}

const fixedCellBase = {
  flexBasis: '0',
  flexGrow: '1',
  overflow: 'hidden',
  width: '100%'
}

module.exports.table.tableHeaderFixedHeight = merge(module.exports.table.tableHeader, fixedCellBase)
module.exports.table.tableCellFixedHeight = merge(module.exports.table.tableCell, fixedCellBase)
module.exports.table.tableCellEvenFixedHeight = merge(module.exports.table.tableCellEven, fixedCellBase)

const dragAndDropBase = {
  alignItems: 'center',
  alignContent: 'center',
  border: `${variables.sizing.baseBorderWidth} dashed ${variables.colors.royalBlue}`,
  borderRadius: variables.sizing.baseBorderRadius,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: variables.padding.a,
  width: '100%'
}

module.exports.dragAndDrop = {
  dragAndDrop: dragAndDropBase,
  dragAndDropOk: merge(dragAndDropBase, {
    borderColor: variables.colors.green
    // Animation in the future?
  }),
  dragAndDropNotOk: merge(dragAndDropBase, {
    borderColor: variables.colors.midRed
  }),
  dragAndDropHeading: merge(module.exports.typography.h5, {
    textAlign: 'center'
  }),
  dragAndDropCopy: merge(module.exports.typography.p, {
    margin: '0',
    textAlign: 'center'
  }),
  dragAndDropFakeLink: merge(module.exports.typography.p, {
    color: variables.colors.royalBlue,
    margin: '0',
    textAlign: 'center',
    textDecoration: 'underline'
  }),
  dragAndDropCopyEmphasis: merge(module.exports.headings.pBold, {
    fontStyle: 'normal'
  })
}

module.exports.highlightColour = {
  color: variables.colors.midRed
}
