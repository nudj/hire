const React = require('react')
const getStyle = require('./overlay.css')
const { hideDialog } = require('../../actions/app')

function onClickBackground (props) {
  return (event) => props.dispatch(hideDialog())
}

function onClickClose (props) {
  return (event) => props.dispatch(hideDialog())
}

function onClickDialog (props) {
  return (event) => event.stopPropagation()
}

const Overlay = (props) => {
  const style = getStyle()
  return <div className={props.overlay ? style.background : style.hidden} onClick={onClickBackground(props)}>
    <div className={style.dialog} onClick={onClickDialog(props)}>
      <button className={style.close} onClick={onClickClose(props)}>x</button>
      {props.overlay}
    </div>
  </div>
}

module.exports = Overlay
