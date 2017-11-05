const React = require('react')
const ReactTextAreaAutosize = require('react-textarea-autosize')

const getStyle = require('./style.css')
const Textarea = ReactTextAreaAutosize.default || ReactTextAreaAutosize

const QuestionFreetext = (props) => {
  const style = getStyle()
  const {
    name,
    title,
    options,
    value,
    onChange
  } = props

  return (
    <div>
      <label className={style.label} htmlFor={name}>{title}</label>
      <Textarea className={style.textarea} id={name} name={name} placeholder={options.placeholder} onChange={onChange(name)} value={value || ''} />
    </div>
  )
}

module.exports = QuestionFreetext
