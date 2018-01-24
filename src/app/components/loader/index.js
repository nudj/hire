const React = require('react')
const { css } = require('@nudj/components/lib/css')
const { Text } = require('@nudj/components')

const style = require('./style.css')

const Loader = props => (
  <div className={css(style.root)}>
    <div className={css(style.body)}>
      <div className={css(style.spinner)} />
      <Text element='div' size='largeI' style={style.message}>
        {props.message}
      </Text>
    </div>
  </div>
)

module.exports = Loader
