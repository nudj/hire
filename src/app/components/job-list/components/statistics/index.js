const React = require('react')

const { Card, Statistic } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')

const style = require('./style.css')
const Section = require('../../../../components/section')

const statisticStyleSheet = { root: mss.fgPrimary }

const getComparatorString = (value, period) => {
  if (period === 'week') return `${value} last week`
  if (period === 'month') return `${value} last month`
  return null
}

const getStatisticDirection = (currentValue, previousValue) => {
  if (currentValue === previousValue) return null
  return currentValue > previousValue ? 'asc' : 'desc'
}

const getStatisticCorrelation = (currentValue, previousValue) => {
  if (currentValue === previousValue) return null
  return currentValue > previousValue ? 'positive' : 'negative'
}

const Statistics = ({ jobs, period }) => {
  const {
    totalViewCount,
    totalReferralCount,
    totalApplicationCount,
    pastTotalViewCount,
    pastTotalReferralCount,
    pastTotalApplicationCount
  } = jobs.reduce((all, job) => ({
    totalViewCount: all.totalViewCount + job.viewCount,
    totalReferralCount: all.totalReferralCount + job.referralCount,
    totalApplicationCount: all.totalApplicationCount + job.applicationCount,
    pastTotalViewCount: all.pastTotalViewCount + job.pastViewCount,
    pastTotalReferralCount: all.pastTotalReferralCount + job.pastReferralCount,
    pastTotalApplicationCount: all.pastTotalApplicationCount + job.pastApplicationCount
  }), {
    totalViewCount: 0,
    totalReferralCount: 0,
    totalApplicationCount: 0,
    pastTotalViewCount: 0,
    pastTotalReferralCount: 0,
    pastTotalApplicationCount: 0
  })

  return (
    <Section style={style.statisticsList} padding>
      <Card style={style.statisticItem}>
        <Statistic
          nonsensitive
          styleSheet={statisticStyleSheet}
          value={totalViewCount}
          label='Page views'
          direction={getStatisticDirection(totalViewCount, pastTotalViewCount)}
          correlation={getStatisticCorrelation(totalViewCount, pastTotalViewCount)}
          comparator={getComparatorString(pastTotalViewCount, period)}
        />
      </Card>
      <Card style={style.statisticItem}>
        <Statistic
          nonsensitive
          styleSheet={statisticStyleSheet}
          value={totalReferralCount}
          label='Links created'
          direction={getStatisticDirection(totalReferralCount, pastTotalReferralCount)}
          correlation={getStatisticCorrelation(totalReferralCount, pastTotalReferralCount)}
          comparator={getComparatorString(pastTotalReferralCount, period)}
        />
      </Card>
      <Card style={style.statisticItem}>
        <Statistic
          nonsensitive
          styleSheet={statisticStyleSheet}
          value={totalApplicationCount}
          label='Applications'
          direction={getStatisticDirection(totalApplicationCount, pastTotalApplicationCount)}
          correlation={getStatisticCorrelation(totalApplicationCount, pastTotalApplicationCount)}
          comparator={getComparatorString(pastTotalApplicationCount, period)}
        />
      </Card>
    </Section>
  )
}

module.exports = Statistics
