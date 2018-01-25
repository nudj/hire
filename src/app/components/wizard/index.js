const React = require('react')
const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')

const Heading = ({ children, style, size, element, ...props }) => (
  <Text
    {...props}
    element={element}
    size={size}
    style={[styleSheet.heading, style]}
  >
    {children}
  </Text>
)

Heading.defaultProps = {
  element: 'h1',
  size: 'largeIi'
}

const P = ({ children, style, element, ...props }) => (
  <Text {...props} element={element} style={[styleSheet.paragraph, style]}>
    {children}
  </Text>
)

P.defaultProps= {
  element: 'p'
}

const Footer = ({ children, style, ...props }) => (
  <div {...props} className={css(styleSheet.footer, style)}>
    {children}
  </div>
)

module.exports = {
  Heading,
  P,
  Footer,
  styleSheet
}