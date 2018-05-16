const React = require('react')

const { Link, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../button-link')
const style = require('./style.css')

const JobPerformance = props => {
  const {
    title,
    location,
    viewCount,
    referralCount,
    applicationCount,
    jobHref,
    nudjHref
  } = props

  return (
    <div className={css(style.root)}>
      <div className={css(style.header)}>
        <Text nonsensitive element='div' size='largeI' style={style.title}>
          {title}
        </Text>
        <Text nonsensitive element='div' size='smallI' style={style.location}>
          {location}
        </Text>
      </div>
      <dl className={css(style.statisticsList)}>
        <div className={css(style.statisticItem)}>
          <Text nonsensitive size='smallI' element='dt' style={style.statisticValue}>
            {viewCount}
          </Text>
          <Text nonsensitive element='dd' style={style.statisticLabel}>
            Page views
          </Text>
        </div>
        <div className={css(style.statisticItem)}>
          <Text nonsensitive size='smallI' element='dt' style={style.statisticValue}>
            {referralCount}
          </Text>
          <Text element='dd' style={style.statisticLabel}>
            Referrals
          </Text>
        </div>
        <div className={css(style.statisticItem)}>
          <Text nonsensitive size='smallI' element='dt' style={style.statisticValue}>
            {applicationCount}
          </Text>
          <Text nonsensitive element='dd' style={style.statisticLabel}>
            Applications
          </Text>
        </div>
      </dl>
      <div className={css(style.actions)}>
        <ButtonLink nonsensitive href={nudjHref} style={style.action} volume='cheer'>
          nudj job
        </ButtonLink>
        <Link
          nonsensitive
          href={jobHref}
          style={style.action}
          subtle
        >
          View job page
        </Link>
      </div>
    </div>
  )
}

JobPerformance.defaultProps = {
  viewCount: 0,
  referralCount: 0,
  applicationCount: 0
}

module.exports = JobPerformance
