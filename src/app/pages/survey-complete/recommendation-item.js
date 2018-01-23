const React = require('react')
const { ContactCard } = require('@nudj/components')

const ButtonLink = require('../../components/button-link')

const RecommendationItem = ({ id, emailPreference, ...contact }) => (
  <ContactCard
    name={`${contact.firstName} ${contact.lastName}`}
    jobTitle={contact.role.name}
    company={contact.company.name}
  >
    <ButtonLink
      href={ emailPreference ? `/messages/new/${id}` : `?id=${id}` }
      volume='cheer'
    >
      Message
    </ButtonLink>
  </ContactCard>
)

module.exports = RecommendationItem
