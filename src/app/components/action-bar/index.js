const React = require('react')
const PropTypes = require('prop-types')

const { Card } = require('@nudj/components')
const style = require('./style.css')

const ActionBar = ({ children }) => (
  <Card style={style.root}>
    {children(style.action)}
  </Card>
)

ActionBar.propTypes = {
  children: PropTypes.func.isRequired
}

module.exports = ActionBar