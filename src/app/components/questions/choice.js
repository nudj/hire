const React = require('react')
const get = require('lodash/get')

const getStyle = require('./style.css')

const QuestionChoice = (props) => {
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
      <p className={style.helper}>{title}</p>
      <ul className={style.radioList}>
        {options.choices.map(choice => {
          const {
            title: choiceTitle,
            name: choiceName
          } = choice
          return (
            <li key={choiceName} className={style.radio}>
              <input className={style.radioInput} type='radio' id={choiceName} value={choiceName} name={name} onChange={onChange(name, choiceName)} checked={value === choiceName} />
              <label className={style.radioLabel} htmlFor={choiceName}>{choiceTitle}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

module.exports = QuestionChoice
