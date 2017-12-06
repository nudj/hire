// @flow
const React = require('react')
const { Link: RouterLink } = require('react-router-dom')
const { Link: StyledLink } = require('@nudj/components')

type Props = {
  href: string,
  onClick?: Object => void,
  restProps?: Array<mixed>
}

const handleClick = ({ href, onClick }) => event => {
  if (href === window.location.pathname) event.preventDefault()
  typeof onClick === 'function' && onClick(event)
}

const ButtonLink = (props: Props) => {
  const { href, ...restProps } = props

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

module.exports = ButtonLink
