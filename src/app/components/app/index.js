const React = require('react')
const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const getLevelSize = level => {
  switch(level) {
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
  level: 1,
}

module.exports = { Heading }