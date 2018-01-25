const React = require('react')
const { Text } = require('@nudj/components')

const styleSheet = require('./style.css')

const getLevelSize = level => {
  switch (level) {
    case 1:
      return 'largeIi'
    case 2:
    default:
      return 'regular'
  }
}

const Heading = ({ children, style, level, ...props }) => {
  const element = `h${level}`
  const size = getLevelSize(level)

  return (
    <Text
      {...props}
      element={element}
      size={size}
      style={style}
    >
      {children}
    </Text>
  )
}

Heading.defaultProps = {
  level: 1
}

const Para = ({ children, style, element, ...props }) => (
  <Text {...props} element={element} style={[styleSheet.paragraph, style]}>
    {children}
  </Text>
)

Para.defaultProps = {
  element: 'p'
}

module.exports = { Heading, Para }
