const React = require('react')
const classnames = require('classnames')
const { Helmet } = require('react-helmet')

const { css } = require('@nudj/components/lib/css')
const style = require('./style.css')

const ReduxRoot = props => (
  <div className={classnames(props.className, css(style.root))}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>nudj</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    {props.children}
  </div>
)

module.exports = ReduxRoot
