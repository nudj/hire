const React = require('react')
const PropTypes = require('prop-types')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { Text } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { StylePropType } = require('@nudj/components/lib/helpers/prop-types')

const defaultStyleSheet = require('./style.css')

class Job extends React.Component {
  static defaultProps = {
    viewCount: 0,
    referralCount: 0,
    applicationCount: 0,
    renderStats: true
  }

  static propTypes = {
    title: PropTypes.string,
    location: PropTypes.string,
    renderStats: PropTypes.bool,
    viewCount: PropTypes.number,
    referralCount: PropTypes.number,
    applicationCount: PropTypes.number,
    children: PropTypes.node,
    styleSheet: StylePropType
  }

  getStyle = memoize(
    (defaultStyleSheet, styleSheet) => mergeStyleSheets(defaultStyleSheet, styleSheet)
  )

  render () {
    const {
      title,
      location,
      viewCount,
      referralCount,
      applicationCount,
      renderStats,
      children,
      styleSheet
    } = this.props

    const style = this.getStyle(defaultStyleSheet, styleSheet)

    return (
      <div className={css(style.root)}>
        <div className={css(style.body)}>
          <div className={css(style.details)}>
            <Text element='div' size='largeI' style={style.title} nonsensitive>
              {title}
            </Text>
            {location && (
              <Text element='span' size='smallI' style={style.location} nonsensitive>
                {location}
              </Text>
            )}
          </div>
          {renderStats && (
            <dl className={css(style.statisticsList)}>
              <div className={css(style.statisticItem)}>
                <Text
                  size='smallI'
                  element='dt'
                  style={style.statisticValue}
                  nonsensitive
                >
                  {viewCount}
                </Text>
                <Text
                  size='smallI'
                  element='dd'
                  style={style.statisticLabel}
                  nonsensitive
                >
                  Page views
                </Text>
              </div>
              <div className={css(style.statisticItem)}>
                <Text
                  size='smallI'
                  element='dt'
                  style={style.statisticValue}
                  nonsensitive
                >
                  {referralCount}
                </Text>
                <Text
                  size='smallI'
                  element='dd'
                  style={style.statisticLabel}
                  nonsensitive
                >
                  Referrals
                </Text>
              </div>
              <div className={css(style.statisticItem)}>
                <Text
                  size='smallI'
                  element='dt'
                  style={style.statisticValue}
                  nonsensitive
                >
                  {applicationCount}
                </Text>
                <Text
                  size='smallI'
                  element='dd'
                  style={style.statisticLabel}
                  nonsensitive
                >
                  Applications
                </Text>
              </div>
            </dl>
          )}
        </div>
        {children}
      </div>
    )
  }
}

module.exports = Job
