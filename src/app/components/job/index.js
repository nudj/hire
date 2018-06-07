const React = require('react')
const PropTypes = require('prop-types')
const isNil = require('lodash/isNil')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { PillGroup, Text } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { StylePropType } = require('@nudj/components/lib/helpers/prop-types')

const formatExpertiseTag = require('../../lib/format-expertise-tag')
const defaultStyleSheet = require('./style.css')

class Job extends React.Component {
  static defaultProps = {
    expertiseTags: []
  }

  static propTypes = {
    title: PropTypes.string,
    location: PropTypes.string,
    viewCount: PropTypes.number,
    referralCount: PropTypes.number,
    applicationCount: PropTypes.number,
    bonus: PropTypes.string,
    children: PropTypes.node,
    expertiseTags: PropTypes.array,
    styleSheet: StylePropType
  }

  getStyle = memoize(
    (defaultStyleSheet, styleSheet) => mergeStyleSheets(defaultStyleSheet, styleSheet)
  )

  getTagStyleSheet = memoize(
    style => ({root: style.tagGroup})
  )

  getExpertiseTags = memoize(
    tags => tags.map(formatExpertiseTag)
  )

  render () {
    const {
      title,
      location,
      viewCount,
      referralCount,
      applicationCount,
      bonus,
      children,
      styleSheet,
      expertiseTags
    } = this.props

    const style = this.getStyle(defaultStyleSheet, styleSheet)
    const tagStyleSheet = this.getTagStyleSheet(style)
    const hasMeta = (
      !isNil(viewCount) ||
      !isNil(referralCount) ||
      !isNil(applicationCount) ||
      !isNil(bonus)
    )

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
          { hasMeta && (
            <dl className={css(style.statisticsList)}>
              {!isNil(viewCount) && (
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
              )}
              {!isNil(referralCount) && (
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
                    Links created
                  </Text>
                </div>
              )}
              {!isNil(applicationCount) && (
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
              )}
              {!isNil(bonus) && (
                <div className={css(style.statisticItem)}>
                  <Text
                    size='smallI'
                    element='dt'
                    style={style.statisticValue}
                    nonsensitive
                  >
                    {bonus}
                  </Text>
                  <Text
                    size='smallI'
                    element='dd'
                    style={style.statisticLabel}
                    nonsensitive
                  >
                    Referral bonus
                  </Text>
                </div>
              )}
            </dl>
          )}
          {expertiseTags.length > 0 && (
            <div className={css(style.tagContainer)}>
              <PillGroup
                styleSheet={tagStyleSheet}
                values={this.getExpertiseTags(expertiseTags)}
              />
            </div>
          )}
        </div>
        {children}
      </div>
    )
  }
}

module.exports = Job
