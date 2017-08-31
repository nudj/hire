const React = require('react')
const getStyle = require('./overlay.css')
const actions = require('../../actions/app')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')

function onClickDialog (props) {
  return (event) => event.stopPropagation()
}

function onClick (props, action) {
  return (event) => props.dispatch(actions[action]())
}

const Overlay = (props) => {
  const style = getStyle()
  return <div className={props.overlay ? style.background : style.hidden} onClick={onClick(props, 'hideDialog')}>
    <div className={style.dialog} onClick={onClickDialog(props)}>
      <button className={style.close} onClick={onClick(props, 'hideDialog')} />
      <DialogConfirm {...props} onClickConfirm={onClick(props, props.overlay)} onClickCancel={onClick(props, 'hideDialog')} />
    </div>
  </div>
}

module.exports = Overlay
