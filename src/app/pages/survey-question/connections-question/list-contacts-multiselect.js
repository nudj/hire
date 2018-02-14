const React = require('react')
const PropTypes = require('prop-types')

const { Checkbox } = require('@nudj/components')

const ListContacts = require('../../../components/list-contacts')

const ListContactsMultiSelect = (props) => {
  const {
    contacts,
    selectedContacts,
    onChange
  } = props

  const handleChange = ({ value, preventDefault, stopPropagation }) => {
    let newSelectedContacts

    if (selectedContacts.includes(value)) {
      newSelectedContacts = selectedContacts.filter(
        val => val !== value
      )
    } else {
      newSelectedContacts = [...selectedContacts, value]
    }

    onChange({
      value: newSelectedContacts,
      preventDefault,
      stopPropagation
    })
  }

  return (
    <ListContacts
      contacts={contacts}
      onItemClick={handleChange}
      contactChild={({ id }) => {
        return (
          <Checkbox
            value={id}
            checked={selectedContacts.indexOf(id) > -1}
            presentation
          />
        )
      }}
    />
  )
}

ListContactsMultiSelect.propTypes = {
  contacts: PropTypes.array,
  selectedContacts: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

ListContacts.defaultProps = {
  contacts: [],
  selectedContacts: []
}

module.exports = ListContactsMultiSelect
