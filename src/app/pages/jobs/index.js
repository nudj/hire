const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

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
      web,
      whatsappTemplate,
      linkedinTemplate,
      twitterTemplate,
      emailTemplate,
      selections
    } = this.props

    const { connectionsCount } = user
    const company = get(user, 'hirer.company', {})
    const jobs = get(company, 'jobs', [])
    const memberType = get(user, 'hirer.type', memberTypes.MEMBER)

    const isAdmin = memberType === memberTypes.ADMIN
    const hasTeam = company.hirers.length > 1

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Jobs</title>
        </Helmet>
        <Main>
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
          {isAdmin ? (
            <Section padding>
              <div className={css(style.helpPanels)}>
                <div className={css(style.helpPanel)}>
                  <Heading level={2} style={mss.fgPrimary}>
                    Spread the word
                  </Heading>
                  <Para size='smallI'>
                    Your network holds the key to finding top candidates. Be sure
                    to get the word out and start sharing.
                  </Para>
                </div>
                <div className={css(style.helpPanel)}>
                  <Heading level={2} style={mss.fgPrimary}>
                    Onboard your team
                  </Heading>
                  <Para size='smallI'>
                    Be sure to invite your entire team to nudj. After all, many
                    hands make light work (and more referrals).
                  </Para>
                  <ButtonLink
                    href='/invite'
                    volume='cheer'
                    style={style.helpLink}
                    subtle
                    inline
                  >
                    Invite team
                  </ButtonLink>
                </div>
                {!connectionsCount && (
                  <div className={css(style.helpPanel)}>
                    <Heading level={2} style={mss.fgPrimary}>
                      Discover more candidates
                    </Heading>
                    <Para size='smallI'>
                      Jog your team&apos;s memory with an aided recall survey to help
                      them unearth all the top candidates from their networks,
                      not just the obvious ones.
                    </Para>
                    <ButtonLink
                      href='/discover'
                      volume='cheer'
                      style={style.helpLink}
                      subtle
                      inline
                    >
                      Learn more
                    </ButtonLink>
                  </div>
                )}
              </div>
            </Section>
          ) : (
            <Section padding>
              <div className={css(style.helpPanels)}>
                <div className={css(style.helpPanel)}>
                  <Heading level={2} style={mss.fgPrimary}>
                    Hiring&apos;s a team sport
                  </Heading>
                  <Para size='smallI'>
                    Pitch in to find the best people to join your team and get
                    rewarded for doing so.
                  </Para>
                </div>
                <div className={css(style.helpPanel)}>
                  <Heading level={2} style={mss.fgPrimary}>
                    Explore your network
                  </Heading>
                  <Para size='smallI'>
                    Take nudj&apos;s guided survey to start exploring your network
                    further. You&apos;ll be surprised by how many people you
                    actually know.
                  </Para>
                  <ButtonLink
                    href='/sync-contacts/linkedin'
                    volume='cheer'
                    style={style.helpLink}
                    subtle
                    inline
                  >
                    Take the survey
                  </ButtonLink>
                </div>
              </div>
            </Section>
          )}
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
                Great work on sharing {possessiveCase(company.name)} jobs. We&apos;ll be sure
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
