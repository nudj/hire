const React = require('react')
const get = require('lodash/get')
const getStyle = require('./tooltip.css')

function getCopyText (tooltipData, style) {
  const copy = []
  tooltipData['tooltip.tooltiptext'].value.forEach((item, index) => {
    copy.push((<p className={style.tooltipText} key={index}>{item.text}</p>))
  })
  return (copy)
}

function getTitleText (tooltipData) {
  // wtf with this path #vomit
  return tooltipData['tooltip.tooltiptitle'].value[0].text
}

const Tooltip = (props) => {
  const style = getStyle()
  const tooltip = get(props, 'tooltip')

  const tooltipTitle = getTitleText(tooltip.data)
  const tooltipText = getCopyText(tooltip.data, style)

  return (<aside className={style.tooltip}>
    <h1 className={style.tooltipTitle}>{tooltipTitle}</h1>
    {tooltipText}
  </aside>)
}

module.exports = Tooltip
