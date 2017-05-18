const deepmerge = require('deepmerge')
const { StyleSheet, css: _css } = require('aphrodite/no-important')
const variables = require('./variables')
const mixins = require('./mixins')

// make merge non-destructive (emulates immutability)
const merge = (...objs) => deepmerge.all([...objs], { clone: true })

const css = (stylesheet) => {
  return () => {
    const styles = StyleSheet.create(stylesheet)
    return Object.keys(stylesheet).reduce((classList, className) => {
      classList[className] = _css(styles[className])
      return classList
    }, {})
  }
}

module.exports = {
  css,
  merge,
  variables,
  mixins
}
