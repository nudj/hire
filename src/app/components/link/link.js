const React = require('react')
const { Link } = require('react-router-dom')

const onClick = props => event => {
  // prevent pushes to history if destination is current page
  if (props.to === window.location.pathname) {
    event.preventDefault()
  }
  props.onClick && props.onClick(event)
}

const CustomLink = (props) => {
  return <Link {...props} onClick={onClick(props)} />
}

module.exports = CustomLink
