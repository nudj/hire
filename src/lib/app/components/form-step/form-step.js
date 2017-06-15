const React = require('react')
const get = require('lodash/get')
const getStyle = require('./form-step.css')

function renderActiveOption (option, index, style) {
  const optionClass = option.selected ? style.activeOptionSelected : style.activeOption
  const iconContent = option.iconEmoji || (<img src={`/assets/images/${option.icon}`} className={style.activeOptionImage} alt={option.title} />)

  return (<li className={optionClass} key={index}>
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

class FormStep extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    this.state = {
      confirm: false
    }
    this.onClickStep = this.onClickStep.bind(this)
  }
  onClickStep (event) {
    const resets = get(this.props, 'resets')
    if (resets && get(this.props, resets)) {
      this.setState({
        confirm: true
      })
    } else {
      this.props.onClick && this.props.onClick(event)
    }
  }
  render () {
    const isActive = get(this.props, 'isActive')
    const index = get(this.props, 'index')
    const name = get(this.props, 'name')
    const options = get(this.props, 'options')
    const data = get(this.props, name)
    const isComplete = !!data

    let stepClass = this.style.section
    let numberClass = this.style.sectionNumber
    let content = () => <p className={this.style.preActiveText}>{get(this.props, 'placeholder')}</p>

    if (isComplete) {
      numberClass = this.style.sectionNumberComplete
      content = get(this.props, 'completed') || renderCompletedSectionSummary
    }
    if (isActive) {
      stepClass = this.style.sectionActive
      numberClass = this.style.sectionNumberActive
      content = get(this.props, 'content') || renderActiveOptions
    }
    if (this.props.confirm) {
      content = () => this.props.confirm
    }

    return (
      <div className={stepClass} onClick={this.onClickStep}>
        <h4 className={this.style.sectionTitle}>
          <span className={numberClass}>{index}</span>{get(this.props, 'title')}
        </h4>
        {content(data, options, this.style)}
      </div>
    )
  }
}

module.exports = FormStep
