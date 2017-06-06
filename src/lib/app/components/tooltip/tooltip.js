const React = require('react')
const getStyle = require('./tooltip.css')

const PrismicReact = require('../../lib/prismic-react')

function renderIntercomButton (prismicTooltip, style) {
  const tooltipText = prismicTooltip.fragmentToText({fragment: 'tooltip.tooltipintercombutton'})

  if (!tooltipText) {
    return ('')
  }

  const tooltipIntercomButton = (<button className={style.tooltipIntercomButton} id='open-intercom'>{tooltipText}</button>)

  return tooltipIntercomButton
}

const Tooltip = (props) => {
  const style = getStyle()

  const prismicTooltip = new PrismicReact(props)

  const tooltipTitle = (prismicTooltip.fragmentToReact({
    fragment: 'tooltip.tooltiptitle',
    props: {
      className: style.tooltipTitle,
      element: 'h4'
    }
  }))

  const tooltipText = (prismicTooltip.fragmentToReact({
    fragment: 'tooltip.tooltiptext',
    props: {
      className: style.tooltipText,
      element: 'p'
    }
  }))

  const tooltipIntercom = renderIntercomButton(prismicTooltip, style)

  return (<aside className={style.tooltip}>
    {tooltipTitle}
    {tooltipText}
    {tooltipIntercom}
  </aside>)
}

module.exports = Tooltip
