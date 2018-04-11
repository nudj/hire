const React = require('react')
const PropTypes = require('prop-types')

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { PillGroup, Link, Text } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const defaultStyleSheet = require('./style.css')

const renderJobInfo = (jobTitle, company) => {
  if (jobTitle && company) {
    return `${jobTitle}, ${company}`
  } else if (jobTitle) {
    return jobTitle
  } else if (company) {
    return company
  }

  return null
}

const Contact = props => {
  const {
    firstName,
    lastName,
    role,
    company,
    email,
    children,
    styleSheet,
    expertiseTags,
    profileUrl,
    applicationDate,
    referrer
  } = props

  const jobInfo = renderJobInfo(role, company)
  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  return (
    <div className={css(style.root)}>
      <div className={css(style.details)}>
        <Text element='div' size='largeI' style={style.name}>
          {firstName} {lastName}
        </Text>
        { jobInfo && (
          <Text element='span' size='smallI' style={style.job}>
            {jobInfo}
          </Text>
        ) }
        { email && (
          <Text element='span' size='smallI' style={style.email}>
            {email}
          </Text>
        )}
        {profileUrl && (
          <Link
            href={profileUrl}
            target='_blank'
            volume='cheer'
            style={style.link}
            inline
            subtle
            external
          >
            {profileUrl}
          </Link>
        )}
        {expertiseTags.length > 0 && (
          <div className={css(style.tagContainer)}>
            <div className={css(style.metaTitle)}>Expertise</div>
            <PillGroup styleSheet={{root: style.tagGroup}} values={expertiseTags} />
          </div>
        )}
        {(applicationDate || referrer) && (
          <div className={css(style.footer)}>
            {applicationDate && (
              <Text element='div' size='smallI'>
                Applied on{' '}
                <span className={css(mss.bold)}>{applicationDate}</span>
              </Text>
            )}
            {referrer && (
              <Text element='div' size='smallI'>
                Referred by{' '}
                <span className={css(mss.bold)}>{referrer}</span>
              </Text>
            )}
          </div>
        )}
      </div>
      {typeof children === 'function' && (
        <div className={css(style.children)}>
          {children(props)}
        </div>
      )}
    </div>
  )
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string,
  company: PropTypes.string,
  email: PropTypes.string,
  children: PropTypes.func,
  styleSheet: PropTypes.shape({
    root: PropTypes.object,
    details: PropTypes.object,
    attributes: PropTypes.object,
    children: PropTypes.object
  }),
  expertiseTags: PropTypes.arrayOf(PropTypes.string),
  profileUrl: PropTypes.string,
  applicationDate: PropTypes.string,
  referrer: PropTypes.string
}

Contact.defaultProps = {
  expertiseTags: []
}

module.exports = Contact
