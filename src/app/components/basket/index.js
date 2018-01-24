const React = require('react')

const { Align, Button, Text } = require('@nudj/components')

const ButtonLink = require('../button-link')
const style = require('./style.css')

const Basket = ({ basket, skipLabel, nextLabel, nextHref, nextClick }) => (
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
  nextHref: "#"
}

module.exports = Basket