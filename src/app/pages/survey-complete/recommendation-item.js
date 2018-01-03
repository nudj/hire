const React = require('react')
const { Button, ContactCard } = require('@nudj/components')

const RecommendationItem = ({ id, onClick, ...contact }) => {
  const handleClick = e => onClick(id)

  return (
    <ContactCard
      name={`${contact.firstName} ${contact.lastName}`}
      jobTitle={contact.role.name}
      company={contact.company.name}
    >
      <Button onClick={handleClick} volume="cheer">
        Message
      </Button>
    </ContactCard>
  )
}

module.exports = RecommendationItem
