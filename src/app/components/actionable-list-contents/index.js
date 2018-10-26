const React = require('react')
const PropTypes = require('prop-types')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { Text } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/styles')
const CustomPropTypes = require('@nudj/components/lib/helpers/prop-types')

const defaultStyleSheet = require('./style.css')

const ListAction = props => {
  const {
    style = {},
    Component = 'button',
    ...rest
  } = props

  return (
    <Component
      className={css({ ...defaultStyleSheet.action, ...style })}
      {...rest}
    />
  )
}

class ActionableListContents extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.func,
    styleSheet: CustomPropTypes.style
  }

  getStyle = memoize(
    (defaultStyleSheet, styleSheet) => mergeStyleSheets(defaultStyleSheet, styleSheet)
  )

  render () {
    const {
      title,
      subtitle,
      dataPoints,
      children,
      styleSheet
    } = this.props

    const style = this.getStyle(defaultStyleSheet, styleSheet)
    const actions = children && children(ListAction)

    return (
      <div className={css(style.root)}>
        <div className={css(style.body)}>
          <div className={css(style.details)}>
            {title && (
              <div className={css(style.titleContainer)}>
                <Text element='div' size='largeI' style={style.title} nonsensitive>
                  {title}
                </Text>
              </div>
            )}
            {subtitle && (
              <Text element='span' size='smallI' style={style.location} nonsensitive>
                {subtitle}
              </Text>
            )}
          </div>
          {dataPoints && (
            <dl className={css(style.statisticsList)}>
              {dataPoints.map((data, i) => (
                // Valid markup to have div inside dl
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl#Wrapping_name-value_groups_in_%3Cdiv%3E_elements
                <div key={i} className={css(style.statisticItem)}>
                  <Text
                    size='smallI'
                    element='dt'
                    style={style.statisticValue}
                    nonsensitive
                  >
                    {data.value}
                  </Text>
                  <Text
                    size='smallI'
                    element='dd'
                    style={style.statisticLabel}
                    nonsensitive
                  >
                    {data.key}
                  </Text>
                </div>
              ))}
            </dl>
          )}
        </div>
        {actions && actions.length && (
          <div className={css(style.actions)}>
            {actions}
          </div>
        )}
      </div>
    )
  }
}

module.exports = ActionableListContents
