const React = require('react')
const { Card } = require('@nudj/components')
const PropTypes = require('@nudj/components/prop-types')

const style = require('./style.css')

const ActionBar = ({
  style: styleOverrides = {},
  children
}) => (
  <Card style={[style.root, styleOverrides.root]}>
    {children && children(style.action)}
  </Card>
)

ActionBar.propTypes = {
  style: PropTypes.style,
  children: PropTypes.func
}

module.exports = ActionBar
