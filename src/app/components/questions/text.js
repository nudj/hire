const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')

const QuestionText = (props) => {
  const style = getStyle()
  const {
    name,
    title,
    type,
    options,
    value,
    onChange
  } = props
  let html

  return (
    <div>
      <label className={style.label} htmlFor={name}>{title}</label>
      <input className={style.input} type='text' id={name} name={name} placeholder={options.placeholder} onChange={onChange(name)} value={value || ''} />
    </div>
  )
}

module.exports = QuestionText
