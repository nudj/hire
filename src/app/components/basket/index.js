const React = require('react')

const { Align, Pill, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../button-link')
const style = require('./style.css')

const getButtonColor = count => {
  if (count >= 3) {
    return 'shout'
  } else if (count) {
    return 'cheer'
  }

  return 'murmur'
}

const renderFullBasketItems = (basket, maxItems) => {
  const components = basket
    .filter((_, i) => i < maxItems)
    .map(item => (
      <Pill
        style={style.basketItem}
        key={item.id}
      >
        {item.value}
      </Pill>
    ))

  if ((basket.length - components.length) > 0) {
    components.pop()

    components.push(
      <Text
        style={style.basketItem}
        key='rest'
        size='smallI'
      >
        & {basket.length - components.length} others
      </Text>
    )
  }

  return components
}

const Basket = (props) => {
  const {
    basket,
    maxItems,
    itemLabel,
    skipLabel,
    nextLabel,
    nextHref,
    nextClick
  } = props

  return (
    <Align
      styleSheet={{
        right: style.buttonContainer
      }}
      primarySide='right'
      leftChildren={
        basket.length > 0 && (
          <div className={css(style.basketContainer)}>
            <Text fsShow>Selected: </Text>
            <span className={css(style.fullBasket)}>
              {renderFullBasketItems(basket, maxItems)}
            </span>
            <Text style={style.smallBasket}>
              {basket.length} {itemLabel}
            </Text>
          </div>
        )
      }
      rightChildren={
        <ButtonLink
          fsShow
          volume={getButtonColor(basket.length)}
          href={nextHref}
          onClick={nextClick}
        >
          {basket.length ? nextLabel : skipLabel }
        </ButtonLink>
      }
    />
  )
}

Basket.defaultProps = {
  basket: [],
  maxItems: 3,
  skipLabel: 'Skip',
  nextLabel: 'Next',
  itemLabel: 'items',
  nextClick: () => {},
  nextHref: '#'
}

module.exports = Basket
