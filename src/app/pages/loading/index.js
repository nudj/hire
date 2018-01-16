const React = require('react')
const { css } = require('@nudj/components/lib/css')

const Layout = require('../../components/app-layout')
const style = require('./style.css')
const sharedStyle = require('../shared.css')

const Loading = props => (
  <Layout {...props} styleSheet={{root: sharedStyle.root}}>
    <div className={css(style.root)}>
      <div className={css(style.body)}>
        <div className={css(style.spinner)} />
      </div>
    </div>
  </Layout>
)

module.exports = Loading