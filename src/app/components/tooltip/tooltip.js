const React = require('react')
const getStyle = require('./tooltip.css')

const Tooltip = (props) => {
  const style = getStyle()

  return (<aside className={style.tooltip}>
    <h4 className={style.tooltipTitle}>{props.title}</h4>
    <p className={style.tooltipText}>{props.text}</p>
    {props.intercom ? <button className={style.tooltipIntercomButton} id='open-intercom'>{props.intercom}</button> : ''}
  </aside>)
}

module.exports = Tooltip
