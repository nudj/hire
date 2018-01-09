const React = require('react')
const get = require('lodash/get')
const { Table } = require('@nudj/components')

const columns = [
  {
    heading: 'Name',
    name: 'name'
  },
  {
    heading: 'Source',
    name: 'source'
  }
]

const cellRenderer = (column, row, defaultValue) => {
  switch (column.name) {
    case 'name':
      return row.company.name
    default:
      return defaultValue
  }
}

const AccumulatorEmployments = props => {
  const employments = get(props, 'employments')

  return (
    <Table
      data={employments}
      columns={columns}
      cellRenderer={cellRenderer}
    />
  )
}

module.exports = AccumulatorEmployments
