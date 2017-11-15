const React = require('react')
const _get = require('lodash/get')
const { Table } = require('@nudj/components')

// const getStyle = require('./style.css')

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

const AccumulatorFormerEmployers = props => {
  // const style = getStyle()
  const formerEmployers = _get(props, 'formerEmployers')

  return (
    <Table
      data={formerEmployers}
      columns={columns}
      cellRenderer={cellRenderer}
    />
  )
}

module.exports = AccumulatorFormerEmployers
