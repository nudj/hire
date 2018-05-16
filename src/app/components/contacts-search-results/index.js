const React = require('react')
const PropTypes = require('prop-types')
const isNil = require('lodash/isNil')

const { Button, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const ContactsSearchResults = (props) => {
  const {
    contacts,
    onAddIndividualClick,
    query,
    ListComponent,
    listProps
  } = props

  if (!contacts.length && isNil(query)) {
    return null
  } else if (!contacts.length) {
    return (
      <div className={css(mss.ptLgIi, mss.pbLgIi, mss.plReg, mss.prReg)}>
        <Text size='largeI' element='div'>
          0 people match '{query}'
        </Text>
        <Text fsShow element='p' style={mss.mtReg}>
          We can&#39;t find anyone in your contacts that matches your query.
          Try another search term or{' '}
          <Button
            fsShow
            style={[mss.di, mss.pa0]}
            onClick={onAddIndividualClick}
            volume='cheer'
            subtle
          >
            add one manually
          </Button>.
        </Text>
      </div>
    )
  }

  return (
    <ListComponent
      {...listProps}
      contacts={contacts}
    />
  )
}

ContactsSearchResults.propTypes = {
  contacts: PropTypes.array,
  onAddIndividualClick: PropTypes.func,
  query: PropTypes.string,
  ListComponent: PropTypes.func.isRequired,
  listProps: PropTypes.object
}

ContactsSearchResults.defaultProps = {
  contacts: []
}

module.exports = ContactsSearchResults
