const React = require('react')
const { Button, ContactCard } = require('@nudj/components')

// const { css } = require('../../css')
// const styleSheet = require('./style.css')

const RecommendationItem = ({ id, onClick, ...rest }) => {
  const handleClick = e => onClick(id)

  return (
    <ContactCard {...rest}>
      <Button onClick={handleClick} volume="cheer">
        Message
      </Button>
    </ContactCard>
  )
}

module.exports = RecommendationItem
