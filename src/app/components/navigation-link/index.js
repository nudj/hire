const React = require('react')
const { Link: RouterLink } = require('react-router-dom')

const { css } = require('@nudj/components/lib/css')

const NavLink = ({ isActive, to, children, style, activeStyle, location }) => {
  // Allow for passing of single or multiple styles to be spread on `RouterLink`
  const baseStyles = [].concat(style)
  const styles = isActive ? baseStyles.concat(activeStyle) : baseStyles

  return (
    <RouterLink className={css(...styles)} to={to}>
      {children}
    </RouterLink>
  )
}

module.exports = NavLink
