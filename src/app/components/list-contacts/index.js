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

const getRowRenderer = (sharedProps) => {
  const {
    cache,
    contacts,
    onClick,
    child
  } = sharedProps

  return (rowProps) => {
    const {
      key,
      index,
      style: rowStyle,
      parent
    } = rowProps
    const contact = contacts[index]

    const person = get(contact, 'person')
    const firstName = person.firstName || contact.firstName
    const lastName = person.lastName || contact.lastName

    const handleItemClick = (event) => {
      onClick && onClick({
        name: contact.id,
        value: contact,
        preventDefault: event.preventDefault,
        stopPropagation: event.stopPropagation
      })
    }

    const Wrapper = onClick ? ButtonContainer : 'div'
    const wrapperProps = onClick ? {
      onClick: handleItemClick,
      style: [style.item, style.itemInteractive]
    } : {
      className: css(style.item)
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
          <Wrapper {...wrapperProps}>
            <Item
              id={contact.id}
              firstName={firstName}
              lastName={lastName}
              role={get(contact, 'role.name')}
              company={get(contact, 'company.name')}
              email={person.email}
              children={child}
            />
          </Wrapper>
        </div>
      </CellMeasurer>
    )
  }
}

class ListContacts extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    contacts: []
  }

  constructor (props) {
    super(props)

    this.cache = new CellMeasurerCache({
      defaultHeight: 80,
      minHeight: 80,
      fixedWidth: true
    })

    this.unmounting = false
  }

  componentDidMount () {
    setTimeout(() => {
      this.cache.clearAll()

      if (!this.unmounting) {
        this.forceUpdate()
      }
    }, 0)
  }

  handleResize = () => {
    this.cache.clearAll()
  }

  componentWillUnmount () {
    this.unmounting = true
  }

  render () {
    const {
      contacts,
      contactChild,
      onItemClick,
      ...props
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
                {...props}
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

module.exports = ListContacts
