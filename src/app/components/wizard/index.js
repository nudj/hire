const React = require('react')
const { Text } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')
const Section = require('./section')

const Wrapper = ({ children, style, ...props }) => (
  <div {...props} className={css(styleSheet.wrapper, style)}>
    {children}
  </div>
)

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
  Wrapper,
  Section,
  Heading,
  P,
  Footer,
  styleSheet
}