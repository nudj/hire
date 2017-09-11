const React = require('react')
const get = require('lodash/get')
const getStyle = require('./overlay.css')
const actions = require('../../actions/app')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')

function onClickDialog (props) {
  return (event) => event.stopPropagation()
}

function onClick (props, action, args = []) {
  return (event) => props.dispatch(actions[action](...args))
}

const Overlay = (props) => {
  const style = getStyle()
  const onClickCancel = onClick(props, 'hideDialog')

  return <div className={props.overlay ? style.background : style.hidden} onClick={onClickCancel}>
    <div className={style.dialog} onClick={onClickDialog(props)}>
      <button className={style.close} onClick={onClickCancel} />
      <DialogConfirm {...props} options={get(props, 'overlay.options')} onClick={onClick} />
    </div>
  </div>
}

module.exports = Overlay
