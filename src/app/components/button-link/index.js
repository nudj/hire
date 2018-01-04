// @flow
const React = require('react')
const { Link: RouterLink } = require('react-router-dom')
const { Link: StyledLink } = require('@nudj/components')

type Props = {
  href: string,
  onClick?: Object => void,
  restProps?: Array<mixed>,
  preventReload?: boolean
}

const handleClick = ({ preventReload, href, onClick }) => event => {
  if (preventReload && href === window.location.pathname) event.preventDefault()
  typeof onClick === 'function' && onClick(event)
}

const ButtonLink = (props: Props) => {
  const { href, preventReload: _preventReload, ...restProps } = props

  return (
    <StyledLink
      {...restProps}
      href={href}
      onClick={handleClick(props)}
      Component={({ href, ...restSubProps }: Props) => (
        <RouterLink to={href} {...restSubProps} />
      )}
    />
  )
}

ButtonLink.defaultProps = {
  preventReload: true
}

module.exports = ButtonLink
