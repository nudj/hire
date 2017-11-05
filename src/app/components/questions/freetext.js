const React = require('react')
const get = require('lodash/get')
const ReactTextAreaAutosize = require('react-textarea-autosize')

const getStyle = require('./style.css')
const Textarea = ReactTextAreaAutosize.default || ReactTextAreaAutosize

const QuestionFreetext = (props) => {
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
      <Textarea className={style.textarea} id={name} name={name} placeholder={options.placeholder} onChange={onChange(name)} value={value || ''} />
    </div>
  )
}

module.exports = QuestionFreetext
