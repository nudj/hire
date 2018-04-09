const React = require('react')
const PropTypes = require('prop-types')
const sortBy = require('lodash/sortBy')

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { InputField, SegmentedControl, SelectablePillGroup } = require('@nudj/components')

const formatExpertiseTag = require('../../lib/format-expertise-tag')

const defaultStyleSheet = require('./style.css')

const ContactsFilters = (props) => {
  const {
    toggleFavourites,
    expertiseTagsValues,
    expertiseTags,
    onToggleFavourites,
    onExpertiseChange
  } = props

  const style = mergeStyleSheets(defaultStyleSheet)

  return (
    <div className={css(style.root)}>
      <SegmentedControl
        styles={style.field}
        name='favouritesToggle'
        value={toggleFavourites}
        onChange={onToggleFavourites}
      >
        {segment => [
          segment({
            styleSheet: {
              wrapper: style.segment
            },
            id: 'favouritesToggle-false',
            key: 'false',
            value: 'false',
            label: 'All'
          }),
          segment({
            styleSheet: {
              wrapper: style.segment
            },
            id: 'favouritesToggle-true',
            key: 'true',
            value: 'true',
            label: 'Favourites'
          })
        ]}
      </SegmentedControl>
      {expertiseTags.length > 0 && (
        <InputField
          styleSheet={{
            root: style.field,
            label: style.fieldLabel
          }}
          htmlFor='expertiseTags'
          label='Expertise'
        >
          <SelectablePillGroup
            name='expertiseTags'
            values={expertiseTagsValues}
            onChange={onExpertiseChange}
          >
            {pill => sortBy(expertiseTags, 'name').map(tag => pill({
              id: tag.id,
              key: tag.id,
              value: tag.id,
              label: formatExpertiseTag(tag.name)
            }))}
          </SelectablePillGroup>
        </InputField>
      ) }
    </div>
  )
}

ContactsFilters.defaultProps = {
  toggleFavourites: 'false',
  expertiseTags: []
}

ContactsFilters.propTypes = {
  toggleFavourites: PropTypes.oneOf(['true', 'false']),
  expertiseTags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string
  })),
  onToggleFavourites: PropTypes.func.isRequired,
  onExpertiseChange: PropTypes.func.isRequired
}

module.exports = ContactsFilters
