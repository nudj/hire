/* global ID */
// @flow
const React = require('react')
const { Table, Checkbox } = require('@nudj/components')
const { merge } = require('@nudj/library')

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
  onSelect: () => void,
  connections: Array<Connection>,
  selectedConnections: Array<ID>,
  styleSheet: StyleSheetType
}

const columns = [
  {
    heading: '',
    name: 'checkbox'
  },
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
  const { onSelect, connections, selectedConnections, styleSheet } = props

  const cellRenderer = (column, row, defaultValue) => {
    switch (column.name) {
      case 'checkbox':
        return (
          <Checkbox
            checked={row.selected}
            onChange={onSelect}
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

  const data = connections.map(connection => {
    return merge(connection, {
      selected: selectedConnections.includes(connection.id)
    })
  })

  return (
    <Table
      data={data}
      styleSheet={styleSheet}
      columns={columns}
      cellRenderer={cellRenderer}
    />
  )
}

ConnectionsTable.defaultProps = {
  connections: [],
  selectedConnections: [],
  styleSheet: {}
}

module.exports = ConnectionsTable
