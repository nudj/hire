const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Link } = require('react-router-dom')
const isEqual = require('lodash/isEqual')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const {
  Button,
  Card,
  Link: Anchor,
  Modal
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

const { render } = require('../../lib/templater')
const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ButtonLink = require('../../components/button-link')
const ShareableJob = require('../../components/shareable-job')
const { Heading, Para } = require('../../components/app')
const { emailPreferences, memberTypes } = require('../../lib/constants')
const { InviteTeamBanner, GetRewardedBanner } = require('./banners')

const style = require('./style.css')

const createHash = require('hash-generator')

const parseTemplate = (template, data) => {
  return render({
    template: template,
    data,
    splitter: createHash(16),
    brify: () => '\n\n'
  })[0].join('')
}

const jobCardStyle = [style.jobCard, mss.mtReg]

const getIndividualShareProps = (args) => {
  const {
    whatsappTemplate,
    twitterTemplate,
    emailTemplate,
    linkedinTemplate,
    id,
    name,
    jobTitle,
    company,
    bonus,
    referralUrl,
    nudjLinkComponent,
    gmail
  } = args

  const emailBody = parseTemplate(
    emailTemplate.message,
    {
      name,
      referralUrl,
      jobTitle,
      company
    }
  )

  return {
    nudj: {
      to: `/contacts/job/${id}`,
      Component: nudjLinkComponent
    },
    whatsapp: {
      text: parseTemplate(
        whatsappTemplate.message,
        {
          referralUrl,
          jobTitle,
          company
        }
      )
    },
    facebook: {
      url: referralUrl
    },
    messenger: {
      link: referralUrl,
      redirectUri: 'https://nudj.co',
      appId: '1945143509142278'
    },
    linkedin: {
      url: referralUrl,
      title: parseTemplate(
        linkedinTemplate.subject,
        {
          job: { title: jobTitle }
        }
      ),
      summary: parseTemplate(
        linkedinTemplate.message,
        {
          job: { title: jobTitle, bonus },
          company: { name: company }
        }
      )
    },
    twitter: {
      text: parseTemplate(
        twitterTemplate.message,
        {
          referralUrl,
          jobTitle,
          company
        }
      ),
      url: referralUrl,
      via: 'nudj'
    },
    email: {
      gmail,
      to: '',
      subject: parseTemplate(
        emailTemplate.subject,
        {
          referralUrl,
          jobTitle,
          company
        }
      ),
      body: gmail ? encodeURI(emailBody) : emailBody
    }
  }
}

class DashboardPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOnboardingSuccessModal: !!props.newlyOnboarded
    }
  }

  getSharePropsGetters = memoize(
    jobs => jobs.reduce((map, job) => {
      map[job.id] = memoize(getIndividualShareProps, isEqual)
      return map
    }, {})
  )

  handleOnboardingSuccessModalClose = () => {
    this.setState({
      showOnboardingSuccessModal: false
    })
  }

  render () {
    const { showOnboardingSuccessModal } = this.state
    const {
      user,
      whatsappTemplate,
      emailTemplate,
      twitterTemplate,
      linkedinTemplate,
      newlyOnboarded
    } = this.props

    const { hirer, connectionsCount } = user
    const memberType = get(user, 'hirer.type', memberTypes.MEMBER)
    const company = get(user, 'hirer.company', {})
    const jobs = get(company, 'jobs', [])

    const isAdmin = memberType === memberTypes.ADMIN
    const getShareProps = this.getSharePropsGetters(jobs)
    const invitedCount = get(company, 'hirers', [])
      .filter(item => item.id !== hirer.id)
      .length

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
            {isAdmin && (
              <div className={css(style.actions)}>
                <Anchor nonsensitive href='mailto:help@nudj.co' id='open-intercom'>
                  Edit jobs
                </Anchor>
                <ButtonLink
                  volume='cheer'
                  to='/jobs/new'
                  style={mss.mlReg}
                >
                  Add job
                </ButtonLink>
              </div>
            )}
            { jobs.map(job => {
              const jobUrl = getJobUrl({
                protocol: this.props.web.protocol,
                hostname: this.props.web.hostname,
                company: company.slug,
                job: job.slug
              })

              const referralUrl = getReferralUrl({
                protocol: this.props.web.protocol,
                hostname: this.props.web.hostname,
                referralId: job.referral.id
              })

              const shareProps = getShareProps[job.id]({
                whatsappTemplate,
                twitterTemplate,
                emailTemplate,
                linkedinTemplate,
                referralUrl,
                bonus: job.bonus,
                id: job.id,
                name: user.firstName,
                jobTitle: job.title,
                company: company.name,
                nudjLinkComponent: Link,
                gmail: user.emailPreference === emailPreferences.GOOGLE
              })

              return (
                <Card key={job.id} style={jobCardStyle}>
                  <ShareableJob
                    title={job.title}
                    location={job.location}
                    viewCount={job.viewCount}
                    referralCount={job.referralCount}
                    applicationCount={job.applicationCount}
                    jobUrl={jobUrl}
                    referralUrl={referralUrl}
                    bonus={job.bonus}
                    applicantsUrl={
                      isAdmin
                        ? `/applications#${job.slug}`
                        : undefined
                    }
                    shareProps={shareProps}
                  />
                </Card>
              )
            }) }
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
                Nice one, you&apos;re all setup!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                We&apos;ve created your company and posted your job to our
                platform.
              </Para>
              <Para nonsensitive>
                You can now explore the rest of the app, add more jobs and,
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
                  Ok, great!
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
                Help is on the way!
              </Heading>
              <img
                className={css(mss.mtLgIi)}
                src='/assets/images/fist-bump.svg'
                alt=''
              />
              <Para nonsensitive>
                Great work on sharing your company&apos;s jobs. We&apos;ll be sure
                to let you know when someone applies.
              </Para>
              <Para nonsensitive>
                TIn the meantime, if you want to share share your unique links again,
                simply click 'Share job' under each job.
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

module.exports = DashboardPage
