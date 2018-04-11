const React = require('react')
const PropTypes = require('prop-types')
const get = require('lodash/get')
const isEqual = require('lodash/isEqual')
const { format } = require('date-fns')
const List = require('react-virtualized/dist/commonjs/List').List
const WindowScroller = require('react-virtualized/dist/commonjs/WindowScroller').WindowScroller
const AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer').AutoSizer
const CellMeasurer = require('react-virtualized/dist/commonjs/CellMeasurer').CellMeasurer
const CellMeasurerCache = require('react-virtualized/dist/commonjs/CellMeasurer').CellMeasurerCache

const { css } = require('@nudj/components/lib/css')
const { ButtonContainer } = require('@nudj/components')

const Item = require('../contact')
const style = require('./style.css')

const getReferrerName = (referral) => {
  const firstName = get(referral, 'person.firstName', '')
  const lastName = get(referral, 'person.lastName', '')
  const email = get(referral, 'person.email', '')

  if (firstName && lastName && !email.includes('@nudj.co')) {
    return `${firstName} ${lastName}`
  }

  return 'nudj'
}

const getRowRenderer = (sharedProps) => {
  const {
    cache,
    applications,
    onClick,
    child
  } = sharedProps

  return (rowProps) => {
    const {
      index,
      style: rowStyle,
      parent
    } = rowProps
    const application = applications[index]

    const person = get(application, 'person')
    const connection = get(person, 'connection')
    const firstName = person.firstName || connection.firstName
    const lastName = person.lastName || connection.lastName
    const role = get(connection, 'role.name', '')
    const company = get(person, 'employments.company.name', '')
    const referrer = get(application, 'referral', {})
    const referrerName = getReferrerName(referrer)
    const applicationDate = format(application.created, 'DD/MM/YYYY')

    const handleItemClick = (event) => {
      onClick && onClick({
        name: application.id,
        value: application,
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
        key={application.id}
        parent={parent}
        rowIndex={index}
      >
        <div className={css(style.listItem)} style={rowStyle}>
          <Wrapper {...wrapperProps}>
            <Item
              id={application.id}
              firstName={firstName}
              lastName={lastName}
              role={role}
              company={company}
              referrer={referrerName}
              email={person.email}
              children={child}
              applicationDate={applicationDate}
            />
          </Wrapper>
        </div>
      </CellMeasurer>
    )
  }
}

class ListApplication extends React.Component {
  static propTypes = {
    applicationChild: PropTypes.func,
    onItemClick: PropTypes.func,
    applications: PropTypes.array
  }

  static defaultProps = {
    applications: []
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
        this.list.forceUpdateGrid()
      }
    }, 0)
  }

  componentDidUpdate (prevProps) {
    const {
      applications: prevApplications,
      applicationChild: prevapplicationChild, // not for comparison
      onItemClick: prevItemClick, // not for comparison
      ...prevRest
    } = prevProps

    const {
      applications,
      applicationChild, // not for comparison
      onItemClick, // not for comparison
      ...rest
    } = this.props

    if (
      !isEqual(prevApplications, applications) ||
      !isEqual(prevRest, rest)
    ) {
      this.cache.clearAll()

      if (!this.unmounting) {
        this.list.forceUpdateGrid()
      }
    }
  }

  handleResize = () => {
    this.cache.clearAll()
    if (!this.unmounting) {
      this.list.forceUpdateGrid()
    }
  }

  componentWillUnmount () {
    this.unmounting = true
  }

  render () {
    const {
      applications,
      applicationChild,
      onItemClick,
      ...props
    } = this.props

    const rowRenderer = getRowRenderer({
      cache: this.cache,
      applications,
      onClick: onItemClick,
      child: applicationChild
    })

    return (
      <AutoSizer disableHeight onResize={this.handleResize}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                {...props}
                ref={c => { this.list = c }}
                autoHeight
                height={height}
                width={width}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={applications.length}
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

module.exports = ListApplication
