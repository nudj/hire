/* global ID */
// @flow
const React = require('react')
const { Table, Checkbox, RadioButton } = require('@nudj/components')
const { merge } = require('@nudj/library')
const { mergeStyleSheets } = require('@nudj/components/lib/css')

const style = require('./style.css')

type StyleSheetType = {
  root?: Object,
  header?: Object,
  headerRow?: Object,
  heading?: Object,
  body?: Object,
  row?: Object,
  cell?: Object
}

type Connection = {
  company: {
    name: string
  },
  firstName: string,
  lastName: string,
  from: {
    name: string
  },
  source: {
    name: string
  },
  role: {
    name: string
  },
  person: {
    id: ID,
    email: string
  },
  id: ID
}

type ConnectionsTableProps = {
  onSelect?: Object => void,
  connections: Array<Connection>,
  selectedConnections: Array<ID>,
  styleSheet: StyleSheetType,
  multiple?: boolean
}

const checkboxColumn = {
  heading: '',
  name: 'checkbox'
}

const radioColumn = {
  heading: '',
  name: 'radio'
}

const defaultColumns = [
  {
    heading: 'Name',
    name: 'name'
  },
  {
    heading: 'Job title',
    name: 'role.name'
  },
  {
    heading: 'Company',
    name: 'company.name'
  },
  {
    heading: 'Email',
    name: 'person.email'
  }
]

const ConnectionsTable = (props: ConnectionsTableProps) => {
  const {
    onSelect,
    connections,
    selectedConnections,
    styleSheet,
    multiple
  } = props

  const isSelectable = typeof onSelect === 'function'
  // flow hack
  const onSelectHandler = onSelect || (_ => {})

  const getColumns = ({ onSelect, multiple }) => {
    return !isSelectable
      ? defaultColumns
      : [multiple ? checkboxColumn : radioColumn, ...defaultColumns]
  }

  const handleSelect = ({ value, ...rest }) => {
    let newSelectedConnections

    if (multiple) {
      if (selectedConnections.includes(value)) {
        newSelectedConnections = selectedConnections.filter(
          val => val !== value
        )
      } else {
        newSelectedConnections = [...selectedConnections, value]
      }
    } else {
      newSelectedConnections = [value]
    }

    onSelectHandler({
      ...rest,
      value: newSelectedConnections
    })
  }

  const cellRenderer = (column, row, defaultValue) => {
    switch (column.name) {
      case 'radio':
        return (
          <RadioButton
            checked={row.selected}
            onChange={handleSelect}
            name={`${row.firstName} ${row.lastName}`}
            value={row.id}
            id={row.id}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            checked={row.selected}
            onChange={handleSelect}
            name={`${row.firstName} ${row.lastName}`}
            value={row.id}
            id={row.id}
          />
        )
      case 'name':
        return `${row.firstName} ${row.lastName}`
      default:
        return defaultValue
    }
  }

  const data = connections.map(connection =>
    merge(connection, {
      selected: selectedConnections.includes(connection.id)
    })
  )

  return (
    <Table
      data={data}
      styleSheet={mergeStyleSheets(
        style,
        {
          row: isSelectable && style.rowSelectable
        },
        styleSheet
      )}
      columns={getColumns(props)}
      cellRenderer={cellRenderer}
      Row={({ children, className, id }) => {
        return (
          <tr
            onClick={
              isSelectable
                ? e => {
                  handleSelect({
                    preventDefault: e.preventDefault,
                    stopPropagation: e.stopPropagation,
                    value: id,
                    name: id
                  })
                }
                : undefined
            }
            className={className}
            id={id}
          >
            {children}
          </tr>
        )
      }}
    />
  )
}

ConnectionsTable.defaultProps = {
  connections: [],
  selectedConnections: [],
  styleSheet: {}
}

module.exports = ConnectionsTable
