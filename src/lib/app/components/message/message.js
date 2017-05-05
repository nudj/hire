const React = require('react')
const { connect } = require('react-redux')
const { withRouter } = require('react-router-dom')
const get = require('lodash/get')
const style = require('./message.css')

const Component = (props) => {
  return <div className={style.wrapper}>
    {props.message ? <div className={style[get(props, 'message.type')]}>
      <div className={style.copy}>{get(props, 'message.message')}</div>
    </div> : ''}
  </div>
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
