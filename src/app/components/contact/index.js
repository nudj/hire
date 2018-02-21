const React = require('react')
const PropTypes = require('prop-types')

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { Text } = require('@nudj/components')

const defaultStyleSheet = require('./style.css')

const renderContactInfo = (jobTitle, company, email) => {
  if (!jobTitle && !company && !email) return null
  const contactInfo = []

  if (jobTitle && company) {
    contactInfo.push(`${jobTitle} at ${company}`)
  } else if (jobTitle) {
    contactInfo.push(jobTitle)
  } else if (company) {
    contactInfo.push(company)
  }

  if (email) {
    if (contactInfo.length) {
      contactInfo.push(' • ')
    }

    contactInfo.push(email)
  }

  return contactInfo
}

const Contact = props => {
  const {
    firstName,
    lastName,
    role,
    company,
    email,
    children,
    styleSheet
  } = props

  const contactInfo = renderContactInfo(role, company, email)
  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  return (
    <div className={css(style.root)}>
      <div className={css(style.details)}>
        <Text element='div' size='largeI' style={style.name}>
          {firstName} {lastName}
        </Text>
        { contactInfo && (
          <Text element='span' size='smallI' style={style.attributes}>
            {contactInfo}
          </Text>
        ) }
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
  })
}

module.exports = Contact
