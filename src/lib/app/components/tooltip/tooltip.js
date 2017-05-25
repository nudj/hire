const React = require('react')
const get = require('lodash/get')
const getStyle = require('./tooltip.css')

const PrismicReact = require('../../lib/prismic-react')

const Tooltip = (props) => {
  const style = getStyle()

  const prismicTooltip = new PrismicReact(props)

  const tooltipTitle = (prismicTooltip.fragmentToReact({
    fragment: 'tooltip.tooltiptitle',
    props: {
      className: style.tooltipTitle,
      element: 'h1'
    }
  })) || ''

  const tooltipText = (prismicTooltip.fragmentToReact({
    fragment: 'tooltip.tooltiptext',
    props: {
      className: style.tooltipText,
      element: 'p'
    }
  })) || ''

  // Not sure why I can't get the function call to work
  function fuckOnClick () {
    window.alert('yyy')
  }

  const tooltipIntercomButton = (<button data-thing='tooltip-intercom-testing-poop' className={props.className} />)

  const tooltipIntercom = (prismicTooltip.fragmentToReact({
    fragment: 'tooltip.tooltipintercombutton',
    props: {
      className: style.tooltipIntercomButton,
      onClick: fuckOnClick,
      element: tooltipIntercomButton
    }
  })) || ''

  return (<aside className={style.tooltip}>
    {tooltipTitle}
    {tooltipText}
    {tooltipIntercom}
  </aside>)
}

module.exports = Tooltip
