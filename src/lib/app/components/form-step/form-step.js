const React = require('react')
const get = require('lodash/get')
const getStyle = require('./form-step.css')

const renderPreActiveText = (text) => <p className={style.preActiveText}>{text}</p>

function renderActiveOption (option, index, style) {
  const iconContent = option.iconEmoji || (<img src={`/assets/images/${option.icon}`} className={style.activeOptionImage} alt={option.title} />)

  return (<li className={style.activeOption} key={index}>
    <a className={style.activeOptionAction} onClick={option.onClick} href={option.link}>
      <span className={option.iconEmoji ? style.activeOptionIconEmoji : style.activeOptionIcon}>{iconContent}</span>
      <h5 className={style.activeOptionTitle}>{option.title}</h5>
      <p className={style.activeOptionText}>{option.text}</p>
    </a>
  </li>)
}
function renderActiveOptions (data, options, style) {
  return (<ul className={style.activeOptionsContainer}>
    {options.map((option, index) => renderActiveOption(option, index, style))}
  </ul>)
}

function renderCompletedSectionSummary (data, options, style) {
  const title = data.title ? (<h5 className={style.completedSectionSummaryTitle}>{data.title}</h5>) : ''
  const message = data.message

  // Need to support the compose message having multi-line message
  return (<div className={style.completedSectionSummary}>
    {title}
    <p className={style.completedSectionSummaryText}>{message}</p>
  </div>)
}

const FormStep = (props) => {
  const style = getStyle()
  const isActive = get(props, 'isActive')
  const isComplete = !!get(props, 'data')
  const index = get(props, 'index')

  let stepClass = style.section
  let numberClass = style.sectionNumber
  let content = () => <p className={style.preActiveText}>{get(props, 'placeholder')}</p>

  if (isComplete) {
    numberClass = style.sectionNumberComplete
    content = get(props, 'completed') || renderCompletedSectionSummary
  }
  if (isActive) {
    stepClass = style.sectionActive
    numberClass = style.sectionNumberActive
    content = get(props, 'content') || renderActiveOptions
  }

  return (
    <div className={stepClass} onClick={props.onClick}>
      <h4 className={style.sectionTitle}>
        <span className={numberClass}>{index}</span>{get(props, 'title')}
      </h4>
      {content(get(props, 'data'), get(props, 'options'), style)}
    </div>
  )
}

module.exports = FormStep
