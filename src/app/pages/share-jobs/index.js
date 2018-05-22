const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { Link } = require('react-router-dom')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { Button, Card } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

const { render } = require('../../lib/templater')
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

const createHash = require('hash-generator')

const parseTemplate = (template, data) => {
  return render({
    template: template,
    data,
    splitter: createHash(16),
    brify: () => '\n\n'
  })[0].join('')
}

const getIndividualShareProps = (args) => {
  const {
    whatsappTemplate,
    twitterTemplate,
    emailTemplate,
    name,
    jobTitle,
    company,
    referralUrl,
    gmail
  } = args

  return {
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
      body: encodeURI(parseTemplate(
        emailTemplate.message,
        {
          name,
          referralUrl,
          jobTitle,
          company
        }
      ))
    }
  }
}

const jobCardStyle = [style.jobCard, mss.mtReg]

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
      csrfToken
    } = this.props
    const company = get(this.props, 'user.hirer.company', {})
    const jobs = get(company, 'jobs', [])

    const getShareProps = this.getSharePropsGetters(jobs)

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Your first nudj</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Share {company.name}&apos;s jobs with your friends
            </Heading>
            <Para nonsensitive>
              Below is a list of roles that your company is currently hiring
              for. Simply, share each one with anyone who you think might be
              a&nbsp;good&nbsp;fit.
            </Para>
          </Section>
          <Section padding width='largeI'>
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
                referralUrl,
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
                    renderStats={false}
                    expertiseTags={job.tags}
                    jobUrl={jobUrl}
                    referralUrl={referralUrl}
                    shareProps={shareProps}
                  />
                </Card>
              )
            }) }
            <form method='post'>
              <input name='_csrf' value={csrfToken} type='hidden' />
              <Button type='submit' nonsensitive>
                I&apos;m done sharing
              </Button>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = FirstNudjPage
