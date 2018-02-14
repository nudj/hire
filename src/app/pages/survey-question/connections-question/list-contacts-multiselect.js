const React = require('react')
const PropTypes = require('prop-types')
const find = require('lodash/find')

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

    const shouldRemoveSelection = !!find(selectedContacts, { id: value.id })

    if (shouldRemoveSelection) {
      newSelectedContacts = selectedContacts.filter(
        contact => contact.id !== value.id
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
        const checked = !!find(selectedContacts, { id })

        return (
          <Checkbox
            value={id}
            checked={checked}
            presentation
          />
        )
      }}
    />
  )
}

ListContactsMultiSelect.propTypes = {
  contacts: PropTypes.array,
  selectedContacts: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func
}

ListContacts.defaultProps = {
  contacts: [],
  selectedContacts: []
}

module.exports = ListContactsMultiSelect
