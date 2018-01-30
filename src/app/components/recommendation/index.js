const React = require('react')
const get = require('lodash/get')
const { ContactCard } = require('@nudj/components')

const ButtonLink = require('../button-link')

const RecommendationItem = ({ id, href, ...contact }) => (
  <ContactCard
    name={`${get(contact, 'firstName')} ${get(contact, 'lastName')}`}
    jobTitle={get(contact, 'role.name')}
    company={get(contact, 'company.name')}
  >
    <ButtonLink href={href} volume='cheer'>
      Message
    </ButtonLink>
  </ContactCard>
)

module.exports = RecommendationItem
