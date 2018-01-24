const React = require('react')
const { Text } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const styleSheet = require('./style.css')

const Wrapper = ({ children, style, ...props }) => (
  <div {...props} className={css(styleSheet.wrapper, style)}>
    {children}
  </div>
)

const Section = ({ children, style, padding, ...props }) => (
  <div
    {...props}
    className={css(
      styleSheet.section,
      style,
      padding && styleSheet.sectionPadding
    )}
  >
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

module.exports = {
  Wrapper,
  Section,
  Heading,
  P,
  styleSheet
}