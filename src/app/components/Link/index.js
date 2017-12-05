// @flow
const React = require('react')
const { Link: RouterLink } = require('react-router-dom')
const { Link: StyledLink } = require('@nudj/components')

type Props = {
  href: string,
  restProps?: Array<mixed>
}

const Link = ({ href, ...restProps }: Props) => (
  <StyledLink
    {...restProps}
    href={href}
    Component={({ href, ...restSubProps }: Props) => (
      <RouterLink to={href} {...restSubProps} />
    )}
  />
)

module.exports = Link
