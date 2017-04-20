import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from 'lodash/get'
import style from './message.css'

const Component = (props) => {
  return <div className={style.wrapper}>
    {props.message ? <div className={style[get(props, 'message.type')]}>
      <div className={style.copy}>{get(props, 'message.message')}</div>
    </div> : ''}
  </div>
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
