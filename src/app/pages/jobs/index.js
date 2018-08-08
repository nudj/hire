const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const URLSearchParams = require('url-search-params')

const { possessiveCase } = require('@nudj/library')
const { Button, Modal } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/app')
const ButtonLink = require('../../components/button-link')
const { memberTypes } = require('../../lib/constants')
const InviteTeamBanner = require('./components/invite-team-banner')
const GetRewardedBanner = require('./components/get-rewarded-banner')
const ListHeadlineStatistics = require('./components/statistics')
const ListJobs = require('./components/list-jobs')
const style = require('./style.css')

const { updateJobSelection } = require('../../redux/actions/selections')

class JobsPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOnboardingSuccessModal: !!props.newlyOnboarded
    }
  }

  handleOnboardingSuccessModalClose = () => {
    this.setState({
      showOnboardingSuccessModal: false
    })
  }

  handleJobChange = ({ values }) => {
    const { dispatch } = this.props
    dispatch(updateJobSelection(values))
  }

  render () {
    const { showOnboardingSuccessModal } = this.state
    const {
      user,
      location,
      newlyOnboarded,
      web,
      whatsappTemplate,
      linkedinTemplate,
      twitterTemplate,
      emailTemplate,
      selections
    } = this.props

    const { hirer, connectionsCount } = user
    const company = get(user, 'hirer.company', {})
    const jobs = get(company, 'jobs', [])
    const memberType = get(user, 'hirer.type', memberTypes.MEMBER)

    const isAdmin = memberType === memberTypes.ADMIN
    const hasTeam = company.hirers.length > 1
    const queryParams = new URLSearchParams(get(location, 'search', ''))
    const invitedCount = get(company, 'hirers', [])
      .filter(item => item.id !== hirer.id)
      .length

    const selectedPeriod = queryParams.get('period')
    const renderInviteTeamBanner = isAdmin && invitedCount < 5 && !newlyOnboarded
    const renderGetRewardedBanner = !isAdmin && connectionsCount < 1

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Jobs</title>
        </Helmet>
        <Main>
          { renderInviteTeamBanner && (
            <Section padding>
              <InviteTeamBanner />
            </Section>
          ) }
          { renderGetRewardedBanner && (
            <Section padding>
              <GetRewardedBanner />
            </Section>
          ) }
          <Section padding>
            <div className={css(style.durationButtonGroup)}>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  selectedPeriod === 'week' && style.durationButtonActive
                ]}
                href='/?period=week'
                subtle
                preventReload={false}
              >
                This week
              </ButtonLink>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  selectedPeriod === 'month' && style.durationButtonActive
                ]}
                href='/?period=month'
                subtle
                preventReload={false}
              >
                This month
              </ButtonLink>
              <ButtonLink
                nonsensitive
                style={[
                  style.durationButton,
                  !selectedPeriod && style.durationButtonActive
                ]}
                href='/'
                subtle
                preventReload={false}
              >
                All time
              </ButtonLink>
            </div>
          </Section>
          <ListHeadlineStatistics jobs={jobs} period={selectedPeriod} />
          <Section padding>
            <ListJobs
              style={mss.mtReg}
              user={user}
              jobs={jobs}
              web={web}
              isAdmin={isAdmin}
              hasTeam={hasTeam}
              company={company}
              whatsappTemplate={whatsappTemplate}
              linkedinTemplate={linkedinTemplate}
              twitterTemplate={twitterTemplate}
              emailTemplate={emailTemplate}
              values={selections.jobs}
              onChange={this.handleJobChange}
            />
          </Section>
        </Main>
        <Modal
          isOpen={showOnboardingSuccessModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.handleOnboardingSuccessModalClose}
          style={mss.center}
        >
          { isAdmin ? (
            <div>
              <Heading
                nonsensitive
                level={2}
                size='largeIi'
                style={mss.fgPrimary}
              >
                Nice one, you&apos;re all set up!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                You can now explore the rest of the app, add some jobs and,
                when you&apos;re ready, send out invites to your team so
                they can start getting the word out.
              </Para>
              <div className={css(style.buttonGroup)}>
                <Button
                  nonsensitive
                  style={style.button}
                  onClick={this.handleOnboardingSuccessModalClose}
                  volume='cheer'
                >
                  Okay!
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Heading
                nonsensitive
                level={2}
                size='largeIi'
                style={mss.fgPrimary}
              >
                Thanks for sharing!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                Great work on sharing {possessiveCase(company.name)}&apos;s jobs. We&apos;ll be sure
                to let you know when someone applies.
              </Para>
              <Para nonsensitive>
                In the meantime, if you want to share your unique links again,
                simply click 'Share job'.
              </Para>
              <div className={css(style.buttonGroup)}>
                <Button
                  nonsensitive
                  style={style.button}
                  onClick={this.handleOnboardingSuccessModalClose}
                  volume='cheer'
                >
                  Got it!
                </Button>
              </div>
            </div>
          ) }
        </Modal>
      </Layout>
    )
  }
}

module.exports = JobsPage
