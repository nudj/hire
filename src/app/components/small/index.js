const React = require('react')
const PropTypes = require('prop-types')

const { Text } = require('@nudj/components')
const defaultStyleSheet = require('./style.css')

const Small = ({ style, children, ...rest }) => (
  <Text
    size='smallI'
    style={[style, defaultStyleSheet.root]}
    {...rest}
  >
    {children}
  </Text>
)

Small.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

module.exports = Small
