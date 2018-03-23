const React = require('react')
const PropTypes = require('prop-types')

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { PillGroup, Text } = require('@nudj/components')

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
    experienceTags
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
        {experienceTags.length > 0 && (
          <div className={css(style.tagContainer)}>
            <div className={css(style.metaTitle)}>Experience</div>
            <PillGroup styleSheet={{root: style.tagGroup}} values={experienceTags} />
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
  experienceTags: PropTypes.arrayOf(PropTypes.string)
}

Contact.defaultProps = {
  experienceTags: []
}

module.exports = Contact
