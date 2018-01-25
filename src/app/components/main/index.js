const React = require('react')
const { css } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')

const Main = ({ children, style, ...props }) => (
  <div {...props} className={css(styleSheet.root, style)}>
    {children}
  </div>
)

module.exports = Main
