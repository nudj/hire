const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { Link } = require('react-router-dom')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { Button, Card } = require('@nudj/components')
const { mss, css } = require('@nudj/components/styles')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

const compilePrismicTemplate = require('../../lib/compile-prismic-template')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')
const Layout = require('../../components/app-layout')
const ShareableJob = require('../../components/shareable-job')
const { emailPreferences } = require('../../lib/constants')
const style = require('./style.css')

const getIndividualShareProps = (args) => {
  const {
    whatsappTemplate,
    twitterTemplate,
    emailTemplate,
    linkedinTemplate,
    bonus,
    name,
    jobTitle,
    company,
    referralUrl,
    gmail
  } = args

  const emailBody = compilePrismicTemplate(
    emailTemplate.message,
    {
      name,
      referralUrl,
      jobTitle,
      company
    }
  )

  return {
    whatsapp: {
      text: compilePrismicTemplate(
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
      title: compilePrismicTemplate(
        linkedinTemplate.subject,
        {
          job: { title: jobTitle }
        }
      ),
      summary: compilePrismicTemplate(
        linkedinTemplate.message,
        {
          job: { title: jobTitle, bonus },
          company: { name: company }
        }
      )
    },
    twitter: {
      text: compilePrismicTemplate(
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
      subject: compilePrismicTemplate(
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

const jobCardStyle = [style.jobCard, mss.mtReg]

const shareableJobStyleSheet = {
  root: [mss.ptReg, mss.plReg, mss.prReg]
}

class FirstNudjPage extends React.Component {
  getSharePropsGetters = memoize(
    jobs => jobs.reduce((map, job) => {
      map[job.id] = memoize(getIndividualShareProps, isEqual)
      return map
    }, {})
  )

  render () {
    const {
      user,
      whatsappTemplate,
      emailTemplate,
      twitterTemplate,
      linkedinTemplate,
      csrfToken
    } = this.props
    const company = get(this.props, 'user.hirer.company', {})
    const jobs = get(company, 'jobs', [])

    const getShareProps = this.getSharePropsGetters(jobs)

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Share a job</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Pick a job and share it
            </Heading>
            <Para nonsensitive>
              Below are all the roles that {company.name} are
              currently hiring for.
            </Para>
          </Section>
          <Section padding width='regular'>
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
                referral: job.referral.slug
              })

              const shareProps = getShareProps[job.id]({
                whatsappTemplate,
                twitterTemplate,
                emailTemplate,
                linkedinTemplate,
                referralUrl,
                id: job.id,
                bonus: job.bonus,
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
                    slug={job.slug}
                    location={job.location}
                    renderStats={false}
                    expertiseTags={job.tags}
                    bonus={job.bonus}
                    jobUrl={jobUrl}
                    referralUrl={referralUrl}
                    shareProps={shareProps}
                    status={job.status}
                    styleSheet={shareableJobStyleSheet}
                  />
                </Card>
              )
            }) }
          </Section>
          <form method='post' className={css(mss.mtLgIi)}>
            <input name='_csrf' value={csrfToken} type='hidden' />
            <Button type='submit' nonsensitive>
              I&apos;ve finished sharing
            </Button>
          </form>
        </Main>
      </Layout>
    )
  }
}

module.exports = FirstNudjPage
