const React = require('react')
const { Link: RouterLink } = require('react-router-dom')
const { Link: StyledLink } = require('@nudj/components')

const handleClick = ({ preventReload, href, onClick }) => event => {
  if (preventReload && href === window.location.pathname) event.preventDefault()
  typeof onClick === 'function' && onClick(event)
}

const ButtonLink = props => {
  const { href, preventReload: _preventReload, ...restProps } = props

  return (
    <StyledLink
      {...restProps}
      href={href}
      onClick={handleClick(props)}
      Component={({ href, ...restSubProps }) => (
        <RouterLink to={href} {...restSubProps} />
      )}
    />
  )
}

ButtonLink.defaultProps = {
  preventReload: true
}

module.exports = ButtonLink
