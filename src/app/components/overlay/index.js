const React = require('react')
const get = require('lodash/get')
const getStyle = require('./style.css')
const actions = require('../../redux/actions')
const Dialog = require('../dialog')

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
      <Dialog {...props} options={get(props, 'overlay.options')} onClick={onClick} />
    </div>
  </div>
}

module.exports = Overlay