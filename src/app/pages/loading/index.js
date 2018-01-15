const React = require('react')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

const Loading = props => (
  <div className={css(style.root)}>
    <div className={css(style.body)}>
      <div className={css(style.spinner)} />
    </div>
  </div>
)

module.exports = Loading
