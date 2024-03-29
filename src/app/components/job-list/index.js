const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const capitalise = require('lodash/capitalize')
const { Link: RRLink } = require('react-router-dom')

const { possessiveCase } = require('@nudj/library')
const { Button, Modal, Text } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Main = require('../main')
const Section = require('../section')
const { Heading, Para } = require('../app')
const ButtonLink = require('../button-link')
const { memberTypes, jobStatuses } = require('../../lib/constants')
const ListJobs = require('./components/list-jobs')
const TitleCard = require('../title-card')
const style = require('./style.css')

const { updateJobSelection } = require('../../redux/actions/selections')

function fetchIntro (isAdmin, ats) {
  if (ats) {
    return `View all the roles your company is hiring for on ${capitalise(ats)}. If you know someone great, share the job with them for the opportunity to get the referral reward.`
  }

  return isAdmin ? (
    'Create, edit and manage your live job postings. To promote your jobs make sure you share with team members and network to maximise their reach.'
  ) : (
    'View all the roles your company is currently looking to recruit for. If you know someone great, share the job with them for the opportunity to get the referral reward.'
  )
}

class JobList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOnboardingSuccessModal: !!props.newlyOnboarded,
      showSurveyRecentlyCompletedModal: !!props.surveyRecentlyCompleted
    }
  }

  handleOnboardingSuccessModalClose = () => {
    this.setState({
      showOnboardingSuccessModal: false
    })
  }

  handleSurveyRecentlyCompletedModalClose = () => {
    this.setState({
      showSurveyRecentlyCompletedModal: false
    })
  }

  handleJobChange = ({ values }) => {
    const { dispatch } = this.props
    dispatch(updateJobSelection(values))
  }

  render () {
    const {
      showOnboardingSuccessModal,
      showSurveyRecentlyCompletedModal
    } = this.state
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
    const publishedJobs = jobs.filter(job => {
      return job.status === jobStatuses.PUBLISHED
    })

    const isIntegratedWithATS = !!company.ats
    const isAdmin = memberType === memberTypes.ADMIN
    const hasTeam = company.hirers.length > 1
    const title = 'Jobs'
    const intro = fetchIntro(isAdmin, company.ats)

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard
              title={title}
              titleRight={isIntegratedWithATS && (
                <RRLink to={`/integrations/${company.ats.toLowerCase()}`}>
                  <img
                    className={css(style.atsLogo)}
                    src={`/assets/images/${company.ats.toLowerCase()}.svg`}
                  />
                </RRLink>
              )}
            >
              <Text element='p' style={style.descriptionParagraph}>
                {intro}
              </Text>
            </TitleCard>
            <ListJobs
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
              style={mss.mtReg}
            />
          </Section>
          {isAdmin ? (
            <Section>
              <div className={css(style.helpPanels)}>
                {publishedJobs.length ? (
                  <div className={css(style.helpPanel)}>
                    <Heading level={2} style={mss.fgPrimary}>
                      Spread the word
                    </Heading>
                    <Para size='smallI'>
                      Your network holds the key to finding top candidates. Be sure
                      to get the word out and start sharing.
                    </Para>
                  </div>
                ) : (
                  !isIntegratedWithATS && (
                    <div className={css(style.helpPanel)}>
                      <Heading level={2} style={mss.fgPrimary}>
                        Publish a job
                      </Heading>
                      <Para size='smallI'>
                        The first step towards hiring new teammates is
                        publishing a job on nudj.
                      </Para>
                      <ButtonLink
                        href='/jobs/new'
                        volume='cheer'
                        style={style.helpLink}
                        subtle
                        inline
                      >
                        Add new job
                      </ButtonLink>
                    </div>
                  )
                )}
                <div className={css(style.helpPanel)}>
                  <Heading level={2} style={mss.fgPrimary}>
                    Onboard your team
                  </Heading>
                  <Para size='smallI'>
                    Be sure to invite your entire team to nudj. After all, many
                    hands make light work (and more referrals).
                  </Para>
                  <ButtonLink
                    href='/team/invite'
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
                      href='/contacts'
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
            <Section>
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
          {isAdmin ? (
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
                We&apos;ve added an example job to get you started. Feel free to
                update it and make it your own!
              </Para>
              <Para nonsensitive>
                You can now explore nudj, add jobs and,
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
                Referring for rewards
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                It&apos;s time to start sharing {possessiveCase(company.name)} jobs.
                You&apos;ll be rewarded if anyone you refer gets hired.
              </Para>
              <div className={css(style.buttonGroup)}>
                <Button
                  nonsensitive
                  style={style.button}
                  onClick={this.handleOnboardingSuccessModalClose}
                  volume='cheer'
                >
                  Start sharing
                </Button>
              </div>
            </div>
          ) }
        </Modal>
        <Modal
          isOpen={showSurveyRecentlyCompletedModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.handleSurveyRecentlyCompletedModalClose}
          style={mss.center}
        >
          <div>
            <Heading
              nonsensitive
              level={2}
              size='largeIi'
              style={mss.fgPrimary}
            >
              One more thing
            </Heading>
            <img
              className={css(mss.mtLgIi)}
              src='/assets/images/fist-bump.svg'
              alt=''
            />
            <Para nonsensitive>
              Before you can start reaching out to the contacts you&apos;ve just surfaced,
              you need to publish a job.
            </Para>
            <Para nonsensitive>
              How else will they know you&apos;re hiring?
            </Para>
            <div className={css(style.buttonGroup)}>
              <Button
                nonsensitive
                style={style.button}
                onClick={this.handleSurveyRecentlyCompletedModalClose}
                volume='cheer'
              >
                Got it
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

module.exports = JobList
