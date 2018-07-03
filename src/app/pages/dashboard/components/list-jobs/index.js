const React = require('react')
const groupBy = require('lodash/groupBy')

const { getJobUrl, getReferralUrl, merge } = require('@nudj/library')
const { Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { emailPreferences } = require('../../../../lib/constants')
const compilePrismicTemplate = require('../../../../lib/compile-prismic-template')
const ShareableJob = require('../../../../components/shareable-job')
const { Heading } = require('../../../../components/app')
const styleSheet = require('./style.css')

const orderByDate = jobs => jobs.sort((a, b) => (
  new Date(a.created) - new Date(b.created)
))

const ListJobs = (props) => {
  const {
    jobs,
    isAdmin,
    style
  } = props

  return (
    <div className={css(style)}>
      {jobs.map(job => (
        <Card key={job.id} style={styleSheet.jobCard}>
          <ShareableJob {...job} showEdit={isAdmin} />
        </Card>
      ))}
    </div>
  )
}

class ListAllJobs extends React.Component {
  getJobUrl = (slug) => {
    const { web, company } = this.props

    return getJobUrl({
      protocol: web.protocol,
      hostname: web.hostname,
      company: company.slug,
      job: slug
    })
  }

  getReferralUrl = (id) => {
    const { web } = this.props

    return getReferralUrl({
      protocol: web.protocol,
      hostname: web.hostname,
      referralId: id
    })
  }

  getShareCopy = data => {
    const {
      whatsappTemplate,
      linkedinTemplate,
      twitterTemplate,
      emailTemplate
    } = this.props

    return {
      whatsapp: {
        text: compilePrismicTemplate(whatsappTemplate.message, data)
      },
      linkedin: {
        title: compilePrismicTemplate(linkedinTemplate.subject, data),
        summary: compilePrismicTemplate(linkedinTemplate.message, data)
      },
      twitter: {
        text: compilePrismicTemplate(twitterTemplate.message, data)
      },
      email: {
        subject: compilePrismicTemplate(emailTemplate.subject, data),
        body: compilePrismicTemplate(emailTemplate.message, data)
      }
    }
  }

  getShareProps = (job, referralUrl) => {
    const { company, user } = this.props
    const isGmail = user.emailPreference === emailPreferences.GOOGLE

    const shareCopy = this.getShareCopy({
      company,
      name: user.firstName,
      job,
      referralUrl
    })

    return merge(shareCopy, {
      nudj: {
        to: `/contacts/job/${job.id}`
      },
      facebook: {
        url: referralUrl
      },
      messenger: {
        link: referralUrl,
        redirectUri: 'https://hire.nudj.co',
        appId: '1945143509142278'
      },
      linkedin: {
        url: referralUrl
      },
      twitter: {
        url: referralUrl,
        via: 'nudj'
      },
      email: {
        gmail: isGmail,
        to: '',
        body: isGmail ? encodeURI(shareCopy.email.body) : shareCopy.email.body
      }
    })
  }

  formatJobs = (jobs) => {
    const { isAdmin } = this.props

    return orderByDate(
      jobs.map(job => {
        const jobUrl = this.getJobUrl(job.slug)
        const referralUrl = this.getReferralUrl(job.referral.id)
        const applicantsUrl = isAdmin ? `/applications#${job.slug}` : undefined
        const shareProps = this.getShareProps(job, referralUrl)

        return Object.assign({}, job, {
          jobUrl,
          referralUrl,
          applicantsUrl,
          shareProps
        })
      })
    )
  }

  render () {
    const { isAdmin, style } = this.props
    const jobs = this.formatJobs(this.props.jobs)

    const {
      PUBLISHED: published,
      DRAFT: draft,
      ACRCHIVED: archived
    } = groupBy(jobs, 'status')

    return (
      <div className={css(style)}>
        { published && published.length > 0 && (
          <ListJobs
            jobs={published}
            isAdmin={isAdmin}
          />
        )}
        {draft && draft.length > 0 && (
          <div className={css(styleSheet.list)}>
            <Heading level={2} size='smallIi' nonsensitive style={styleSheet.listTitle}>
              Drafts
            </Heading>
            <ListJobs
              jobs={draft}
              isAdmin={isAdmin}
              style={mss.mtReg}
            />
          </div>
        )}
        {archived && archived.length > 0 && (
          <div className={css(styleSheet.list)}>
            <Heading level={2} size='smallIi' nonsensitive style={styleSheet.listTitle}>
              Archived
            </Heading>
            <ListJobs
              jobs={archived}
              isAdmin={isAdmin}
              style={mss.mtReg}
            />
          </div>
        )}
      </div>
    )
  }
}

module.exports = ListAllJobs
