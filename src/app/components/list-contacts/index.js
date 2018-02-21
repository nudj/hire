const React = require('react')
const PropTypes = require('prop-types')
const get = require('lodash/get')
const { css } = require('@nudj/components/lib/css')
const { ButtonContainer } = require('@nudj/components')

const Item = require('../contact')
const style = require('./style.css')

const ListContacts = (props) => {
  const {
    contacts,
    contactChild,
    onItemClick
  } = props

  return (
    <ol className={css(style.list)}>
      {contacts.map(contact => {
        const person = get(contact, 'person')
        const firstName = person.firstName || contact.firstName
        const lastName = person.lastName || contact.lastName

        const handleItemClick = (e) => {
          onItemClick({
            name: contact.id,
            value: contact,
            preventDefault: e.preventDefault,
            stopPropagation: e.stopPropagation
          })
        }

        return (
          <li key={contact.id} className={css(style.listItem)}>
            <ButtonContainer
              onClick={handleItemClick}
              style={[
                style.item,
                handleItemClick && style.itemInteractive
              ]}
            >
              <Item
                id={contact.id}
                firstName={firstName}
                lastName={lastName}
                role={get(contact, 'role.name')}
                company={get(contact, 'company.name')}
                email={person.email}
                children={contactChild}
              />
            </ButtonContainer>
          </li>
        )
      })}
    </ol>
  )
}

ListContacts.propTypes = {
  contactChild: PropTypes.func,
  onItemClick: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      person: PropTypes.shape({
        person: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          email: PropTypes.string
        }),
        role: PropTypes.shape({
          name: PropTypes.string
        }),
        company: PropTypes.shape({
          name: PropTypes.string
        })
      })
    })
  )
}

module.exports = ListContacts
