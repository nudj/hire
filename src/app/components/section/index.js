const React = require('react')
const { css } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')

const Section = ({ children, style, padding, width, ...props }) => (
  <div
    {...props}
    className={css(
      styleSheet.root,
      padding && styleSheet.padding,
      width && styleSheet[width],
      style
    )}
  >
    {children}
  </div>
)

module.exports = Section
