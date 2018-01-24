const React = require('react')

const { Align, Text } = require('@nudj/components')

const ButtonLink = require('../button-link')
const style = require('./style.css')

const Basket = ({ basket, skipLabel, nextLabel, nextHref }) => (
  <Align
    leftChildren={
      <Text style={style.basketCount}>
        { basket.length } added
      </Text>
    }
    rightChildren={
      <ButtonLink
        volume={basket.length ? 'cheer' : 'murmur'}
        href={nextHref}
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
}

module.exports = Basket