const React = require('react')

const style = require('./error-page.css')
const PageNotFound = require('../404-page/404-page')
const ServerError = require('../500-page/500-page')

module.exports = (props) => {
  let html
  if (props.code === 404) {
    html = <PageNotFound />
  } else {
    html = <ServerError />
  }
  return (
    <div className={style.body}>
      {html}
    </div>
  )
}
