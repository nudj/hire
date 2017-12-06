const React = require('react')

const { css } = require('@nudj/components/lib/css')
const style = require('./style.css')

const BasketFooter = (props) => {
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
  value: '',
  children: null
}

module.exports = BasketFooter
