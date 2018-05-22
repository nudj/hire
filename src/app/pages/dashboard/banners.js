const React = require('react')

const {
  ButtonContainer,
  Card,
  Icon,
  ScreenReadable
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { Heading, Para } = require('../../components/app')
const OncePerSession = require('../../components/once-per-session')
const ButtonLink = require('../../components/button-link')
const style = require('./banner.css')

const GetRewardedBanner = OncePerSession('rewarded-banner', ({ close }) => (
  <Card style={style.banner}>
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

const InviteTeamBanner = OncePerSession('invite-team-banner', ({ close }) => (
  <Card style={style.banner}>
    <Heading style={mss.fgPrimary}>
      Hiring should be a team sport
    </Heading>
    <Para style={style.para}>
      Be sure to invite your entire team to nudj, after all many hands make
      light work (and more referrals).
    </Para>
    <img className={css(style.image)} src='/assets/images/send-nudjes.svg' />
    <ButtonLink
      style={style.action}
      volume='cheer'
      href='/invite'
      onClick={close}
    >
      Invite team
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

module.exports = { InviteTeamBanner, GetRewardedBanner }
