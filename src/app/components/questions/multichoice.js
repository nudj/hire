const React = require('react')

const getStyle = require('./style.css')

const QuestionMultichoice = (props) => {
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
      <p className={style.helper}>{title}</p>
      <ul className={style.radioList}>
        {options.choices.map(choice => {
          const {
            title: choiceTitle,
            name: choiceName
          } = choice
          return (
            <li key={choiceName} className={style.checkbox}>
              <input className={style.checkboxInput} type='checkbox' id={choiceName} value={choiceName} name={name} onChange={onChange(name, choiceName)} checked={value ? value.includes(choiceName) : false} />
              <label className={style.checkboxLabel} htmlFor={choiceName}>{choiceTitle}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

module.exports = QuestionMultichoice
