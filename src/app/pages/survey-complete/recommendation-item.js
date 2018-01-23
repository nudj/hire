const React = require('react')
const get = require('lodash/get')
const { ContactCard } = require('@nudj/components')

const ButtonLink = require('../../components/button-link')

const RecommendationItem = ({ id, ...contact }) => (
  <ContactCard
    name={`${contact.firstName} ${contact.lastName}`}
    jobTitle={get(contact, 'role.name')}
    company={get(contact, 'company.name')}
  >
    <ButtonLink href={`?id=${id}`} volume='cheer'>
      Message
    </ButtonLink>
  </ContactCard>
)

module.exports = RecommendationItem
