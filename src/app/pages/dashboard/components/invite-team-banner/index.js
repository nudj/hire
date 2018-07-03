const React = require('react')

const {
  ButtonContainer,
  Card,
  Icon,
  ScreenReadable
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { Heading, Para } = require('../../../../components/app')
const OncePerSession = require('../../../../components/once-per-session')
const ButtonLink = require('../../../../components/button-link')
const style = require('./style.css')

const InviteTeamBanner = OncePerSession('invite-team-banner', ({ close }) => (
  <Card style={style.root}>
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

module.exports = InviteTeamBanner
