const React = require('react')
const get = require('lodash/get')
const getStyle = require('./style.css')

const Dialog = (props) => {
  const style = getStyle()
  const dialog = get(props, 'dialog', {})
  const title = get(dialog, 'title', '')
  const text = get(dialog, 'text', '')
  const options = get(props, 'overlay.options', [])

  return (
    <div className={style.dialog}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.text}>{text}</p>
      <div className={style.buttons}>
        {
          options.map((option, index) => (
            <button key={`${option.type}${index}`} className={get(style, option.type)} title={option.title || get(dialog, option.type)} onClick={props.onClick(props, option.action.name, option.action.arguments)}>{option.title || get(dialog, option.type)}</button>
          ))
        }
      </div>
    </div>
  )
}

module.exports = Dialog
