const React = require('react')
const get = require('lodash/get')
const getStyle = require('./form-step.css')

const renderPreActiveText = (text) => <p className={this.style.preActiveText}>{text}</p>

const FormStep = (props) => {
  const style = getStyle()
  const isActive = get(props, 'isActive')
  const isComplete = get(props, 'isComplete')
  const index = get(props, 'index')

  let stepClass = style.section
  let numberClass = style.sectionNumber
  let content = () => <p className={style.preActiveText}>{get(props, 'placeholder')}</p>

  if (isComplete) {
    numberClass = style.sectionNumberComplete
    content = get(props, 'completed')
  }
  if (isActive) {
    stepClass = style.sectionActive
    numberClass = style.sectionNumberActive
    content = get(props, 'content')
  }

  return (
    <div className={stepClass}>
      <h4 className={style.sectionTitle}>
        <span className={numberClass}>{index}</span>{get(props, 'title')}
      </h4>
      {content(get(props, 'data'))}
    </div>
  )
}

module.exports = FormStep
