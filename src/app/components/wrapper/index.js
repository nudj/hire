const React = require('react')
const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')

const Wrapper = ({ children, style, ...props }) => (
  <div {...props} className={css(styleSheet.root, style)}>
    {children}
  </div>
)

module.exports = Wrapper