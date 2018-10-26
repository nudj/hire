const React = require('react')

const {
  ButtonContainer,
  Card,
  Icon,
  ScreenReadable
} = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const { Heading, Para } = require('../../../../components/app')
const OncePerSession = require('../../../../components/once-per-session')
const ButtonLink = require('../../../../components/button-link')
const style = require('./style.css')

const GetRewardedBanner = OncePerSession('rewarded-banner', ({ close }) => (
  <Card style={style.root}>
    <Heading style={mss.fgPrimary}>
      Increase your chances of getting rewarded
    </Heading>
    <Para style={style.para}>
      Sync your LinkedIn connections and we&apos;ll help you find more
      people worth referring, meaning you&apos;re more likely to get that
      juicy cash bonus on offer.
    </Para>
    <img className={css(style.image, style.uncoverGems)} src='/assets/images/uncover-gems.svg' />
    <ButtonLink
      style={style.action}
      volume='cheer'
      href='/sync-contacts/linkedin'
      onClick={close}
    >
      Sync LinkedIn
    </ButtonLink>
    <ButtonContainer
      style={style.closeButton}
      onClick={close}
    >
      <Icon name='close' />
      <ScreenReadable>Close share panel</ScreenReadable>
    </ButtonContainer>
  </Card>
))

module.exports = GetRewardedBanner
