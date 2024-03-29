const React = require('react')
const PropTypes = require('prop-types')
const get = require('lodash/get')
const { format } = require('date-fns')

const { css } = require('@nudj/components/styles')
const { ButtonContainer } = require('@nudj/components')

const Item = require('../contact')
const style = require('./style.css')

const getReferrerName = (referral) => {
  const firstName = get(referral, 'person.firstName', '')
  const lastName = get(referral, 'person.lastName', '')
  const email = get(referral, 'person.email', '')

  if (firstName && lastName && !email.includes('@nudj.co')) {
    return `${firstName} ${lastName}`
  }

  return 'nudj'
}

const Row = (props) => {
  const { application, onClick, children } = props

  const person = get(application, 'person')
  const { firstName, lastName, email, role, company, url } = person
  const referrer = get(application, 'referral', {})
  const referrerName = getReferrerName(referrer)
  const applicationDate = format(application.created, 'DD/MM/YYYY')

  const handleItemClick = (event) => {
    onClick && onClick({
      name: application.id,
      value: application,
      preventDefault: event.preventDefault,
      stopPropagation: event.stopPropagation
    })
  }

  const Wrapper = onClick ? ButtonContainer : 'div'
  const wrapperProps = onClick ? {
    onClick: handleItemClick,
    style: [style.item, style.itemInteractive]
  } : {
    className: css(style.item)
  }

  return (
    <div className={css(style.listItem)}>
      <Wrapper {...wrapperProps}>
        <Item
          id={application.id}
          firstName={firstName}
          lastName={lastName}
          role={get(role, 'name')}
          company={get(company, 'name')}
          profileUrl={url}
          referrer={referrerName}
          email={email}
          applicationDate={applicationDate}
        >
          {children}
        </Item>
      </Wrapper>
    </div>
  )
}

class ListApplication extends React.Component {
  static propTypes = {
    applicationChild: PropTypes.func,
    onItemClick: PropTypes.func,
    applications: PropTypes.array
  }

  static defaultProps = {
    applications: []
  }

  render () {
    const {
      applications,
      applicationChild,
      onItemClick,
      ...props
    } = this.props

    return (
      <div>
        { applications.map(application => (
          <Row
            key={application.id}
            application={application}
            onClick={onItemClick}
            {...props}
          >
            {applicationChild}
          </Row>
        ))}
      </div>
    )
  }
}

module.exports = ListApplication
