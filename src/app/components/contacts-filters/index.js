const React = require('react')
const PropTypes = require('prop-types')
const startCase = require('lodash/startCase')

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { InputField, SegmentedControl, SelectablePillGroup } = require('@nudj/components')

const defaultStyleSheet = require('./style.css')

/**
 * TODO: Remove
 * This is here to temporarily format tags so they're in roughly the right
 * format for display, e.g., `CEO` instead of `ceo` or `Ceo`.
 */
const getTagLabel = (tag) => {
  if (tag.length === 3 && tag.indexOf('c') === 0 && tag.indexOf('o') === 2) {
    return tag.toUpperCase()
  } else if (tag.indexOf('vp') === 0) {
    const tagParts = tag.split(' ')
    tagParts[0] = tagParts[0].toUpperCase()
    return tagParts.join(' ')
  } else {
    return startCase(tag)
  }
}

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
            {pill => expertiseTags.map(tag => pill({
              id: tag,
              key: tag,
              value: tag,
              label: getTagLabel(tag)
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
  expertiseTags: PropTypes.arrayOf(PropTypes.string),
  onToggleFavourites: PropTypes.func.isRequired,
  onExpertiseChange: PropTypes.func.isRequired
}

module.exports = ContactsFilters
