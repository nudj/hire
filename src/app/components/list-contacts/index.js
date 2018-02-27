const React = require('react')
const PropTypes = require('prop-types')
const get = require('lodash/get')
const List = require('react-virtualized/dist/commonjs/List').List
const WindowScroller = require('react-virtualized/dist/commonjs/WindowScroller').WindowScroller
const AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer').AutoSizer
const CellMeasurer = require('react-virtualized/dist/commonjs/CellMeasurer').CellMeasurer
const CellMeasurerCache = require('react-virtualized/dist/commonjs/CellMeasurer').CellMeasurerCache

const { css } = require('@nudj/components/lib/css')
const { ButtonContainer } = require('@nudj/components')

const Item = require('../contact')
const style = require('./style.css')

const getRowRenderer = ({
  cache,
  contacts,
  onClick,
  child
}) => ({
  key,
  index,
  isScrolling,
  isVisible,
  style: rowStyle,
  parent,
}) => {
  const contact = contacts[index]

  const person = get(contact, 'person')
  const firstName = person.firstName || contact.firstName
  const lastName = person.lastName || contact.lastName

  const handleItemClick = (e) => {
    onClick({
      name: contact.id,
      value: contact,
      preventDefault: e.preventDefault,
      stopPropagation: e.stopPropagation
    })
  }

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div className={css(style.listItem)} style={rowStyle}>
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
            children={child}
          />
        </ButtonContainer>
      </div>
    </CellMeasurer>
  )
}

class ListContacts extends React.Component {
  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      defaultHeight: 80,
      minHeight: 80,
      fixedWidth: true
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.cache.clearAll()
      this.forceUpdate()
    }, 0)
  }

  handleResize = () => {
    this.cache.clearAll()
  }

  render() {
    const {
      contacts,
      contactChild,
      onItemClick
    } = this.props

    const rowRenderer = getRowRenderer({
      cache: this.cache,
      contacts,
      onClick: onItemClick,
      child: contactChild
    })

    return (
      <AutoSizer disableHeight onResize={this.handleResize}>
        {({width}) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                autoHeight
                height={height}
                width={width}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={contacts.length}
                rowHeight={this.cache.rowHeight}
                rowRenderer={rowRenderer}
                tabIndex={-1}
                deferredMeasurementCache={this.cache}
              />
            )}
          </WindowScroller>
        )}
      </AutoSizer>
    )
  }
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

ListContacts.defaultPros = {
  contacts: []
}

module.exports = ListContacts
