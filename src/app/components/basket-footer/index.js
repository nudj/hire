// @flow
const React = require('react')

const { css } = require('@nudj/components/lib/css')
const style = require('./style.css')

type BasketFooterProps = {
  value: string,
  children?: React.Node
}

const BasketFooter = (props: BasketFooterProps) => {
  const { value } = props
  return (
    <div className={css(style.basket)}>
      <div className={css(style.value)}>
        {value}
      </div>
      <div className={css(style.children)}>
        {props.children}
      </div>
    </div>
  )
}

BasketFooter.defaultProps = {
  value: ''
}

module.exports = BasketFooter
