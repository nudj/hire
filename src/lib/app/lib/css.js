let merge = require('lodash/merge')
let { StyleSheet, css } = require('aphrodite/no-important')

module.exports.css = (stylesheet) => {
  const styles = StyleSheet.create(stylesheet)

  return Object.keys(stylesheet).reduce((classList, className) => {
    classList[className] = css(styles[className])
    return classList
  }, {})
}

module.exports.merge = merge

module.exports.breakpoints = {
  ns: '@media screen and (min-width: 30em)',
  m: '@media screen and (min-width: 30em) and (max-width: 60em)',
  l: '@media screen and (min-width: 60em)'
}

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
