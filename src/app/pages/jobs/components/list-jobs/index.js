const React = require('react')
const groupBy = require('lodash/groupBy')

const { getJobUrl, getReferralUrl, merge } = require('@nudj/library')
const { Card, Checkbox, ListMultiSelect } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { emailPreferences } = require('../../../../lib/constants')
const compilePrismicTemplate = require('../../../../lib/compile-prismic-template')
const ShareableJob = require('../../../../components/shareable-job')
const { Heading } = require('../../../../components/app')
const ActionBar = require('../../../../components/action-bar')
const ButtonLink = require('../../../../components/button-link')
const styleSheet = require('./style.css')

const selectableJobStyleSheet = {
  root: [mss.ptReg, mss.plReg, mss.prReg]
}

const orderByDate = jobs => jobs.sort((a, b) => (
  new Date(a.created) - new Date(b.created)
))

const getShareButtonCopy = (selected, total) => {
  if (selected === 1) {
    return 'Share 1 job'
  } else if (selected === total) {
    return 'Share all jobs'
  }

  return `Share ${selected} jobs`
}

const ListSelectableJobs = (props) => {
  const {
    jobs,
    name,
    onChange,
    values,
    isAdmin,
    disabled,
    style
  } = props

  return (
    <ListMultiSelect
      name={name}
      onChange={onChange}
      values={values}
      joined={false}
      disabled={disabled}
      style={style}
    >
      {listItem => jobs.map(job => listItem({
        value: job.id,
        key: job.id,
        id: job.id,
        children: (
          <ShareableJob
            {...job}
            styleSheet={selectableJobStyleSheet}
            showEdit={isAdmin}
          />
        )
      }))}
    </ListMultiSelect>
  )
}

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

const defaultJobGroup = []

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

  handleToggleAllPublished = () => {
    const { jobs, values, onChange } = this.props
    const { PUBLISHED: published = defaultJobGroup } = groupBy(jobs, 'status')

    if (values.length !== published.length) {
      const publishedIds = published.map(job => job.id)
      onChange({ values: publishedIds })
    } else {
      onChange({ values: [] })
    }
  }

  render () {
    const {
      isAdmin,
      style,
      values,
      onChange
    } = this.props

    const jobs = this.formatJobs(this.props.jobs)

    const {
      PUBLISHED: published = defaultJobGroup,
      DRAFT: draft = defaultJobGroup,
      ARCHIVED: archived = defaultJobGroup
    } = groupBy(jobs, 'status')

    const noPublishedSelected = !values.length
    const allPublishedSelected = values.length === published.length
    const somePublishedSelected = !allPublishedSelected && values.length > 0

    const ListComponent = isAdmin ? ListSelectableJobs : ListJobs

    return (
      <div className={css(style)}>
        {isAdmin && (
          <ActionBar>
            {actionStyle => [
              <Checkbox
                key='select-all-published'
                onChange={this.handleToggleAllPublished}
                checked={allPublishedSelected}
                indeterminate={somePublishedSelected}
                id='select-all-published'
                name='select-all-published'
                styleSheet={{
                  wrapper: styleSheet.selectAllCheckboxWrapper,
                  labelContainer: styleSheet.selectAllCheckbox
                }}
              />,
              noPublishedSelected ? (
                <ButtonLink
                  key='add-job-button'
                  style={actionStyle}
                  volume='cheer'
                  to='/jobs/new'
                  subtle
                >
                  Add job
                </ButtonLink>
              ) : (
                <ButtonLink
                  key='share-jobs-button'
                  style={actionStyle}
                  volume='cheer'
                  to='/jobs/share-with-team'
                  subtle
                >
                  {getShareButtonCopy(values.length, published.length)}
                </ButtonLink>
              )
            ]}
          </ActionBar>
        ) }
        { published.length > 0 && (
          <ListComponent
            jobs={published}
            isAdmin={isAdmin}
            onChange={onChange}
            values={values}
            style={mss.mtReg}
          />
        )}
        {draft && draft.length > 0 && (
          <div className={css(styleSheet.list)}>
            <Heading level={2} size='smallIi' nonsensitive style={styleSheet.listTitle}>
              Drafts
            </Heading>
            <ListComponent
              jobs={draft}
              isAdmin={isAdmin}
              style={mss.mtReg}
              onChange={onChange}
              values={values}
              disabled
            />
          </div>
        )}
        {archived && archived.length > 0 && (
          <div className={css(styleSheet.list)}>
            <Heading level={2} size='smallIi' nonsensitive style={styleSheet.listTitle}>
              Archived
            </Heading>
            <ListComponent
              jobs={archived}
              isAdmin={isAdmin}
              style={mss.mtReg}
              onChange={onChange}
              values={values}
              disabled
            />
          </div>
        )}
      </div>
    )
  }
}

module.exports = ListAllJobs
