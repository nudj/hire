const React = require('react')

const { Align, Text } = require('@nudj/components')

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

const Basket = ({ basket, skipLabel, nextLabel, nextHref, nextClick }) => (
  <Align
    leftChildren={
      <Text style={style.basketCount}>
        { basket.length } added
      </Text>
    }
    rightChildren={
      <ButtonLink
        volume={getButtonColor(basket.length)}
        href={nextHref}
        onClick={nextClick}
      >
        {basket.length ? nextLabel : skipLabel }
      </ButtonLink>
    }
  />
)

Basket.defaultProps = {
  basket: [],
  skipLabel: 'Skip',
  nextLabel: 'Next',
  nextClick: () => {},
  nextHref: '#'
}

module.exports = Basket
