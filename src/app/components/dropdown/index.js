const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')

const { merge } = require('@nudj/library')
const { css, mergeStyleSheets } = require('@nudj/components/styles')
const { Icon } = require('@nudj/components')

const defaultStyles = require('./style.css')
const { toggleDropdown } = require('../../redux/actions/dropdowns')

function handleDropdownClick (dispatch, id) {
  dispatch(toggleDropdown(id))
}
const stopPropagation = event => event.stopPropagation()

const Dropdown = props => {
  const {
    id,
    dispatch,
    children,
    dropdowns,
    styleSheet,
    header,
    chevron
  } = props

  const style = mergeStyleSheets(defaultStyles, styleSheet)
  const handleClick = () => handleDropdownClick(dispatch, id)

  return (
    <div className={css(style.dropdown)} onClick={stopPropagation}>
      <div onClick={handleClick} className={css(style.header)}>
        {header}
        {chevron && <Icon name='chevron' style={style.chevron} />}
      </div>
      {dropdowns.activeDropdown === id && (
        <div className={css(style.dropdownContent)}>
          <ul className={css(style.list)}>
            {children && [].concat(children).map((child, i) => (
              <li className={css(style.listItem)} key={i}>
                {child}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

Dropdown.defaultProps = {
  styleSheet: {},
  chevron: false
}

Dropdown.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
  styleSheet: PropTypes.object,
  header: PropTypes.string.isRequired,
  children: PropTypes.node,
  chevron: PropTypes.bool.isRequired
}

module.exports = connect(merge)(Dropdown)
