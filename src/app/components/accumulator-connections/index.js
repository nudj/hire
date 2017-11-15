const React = require('react')
const _get = require('lodash/get')
const _find = require('lodash/find')
const { Table } = require('@nudj/components')
const { merge } = require('@nudj/library')

// const getStyle = require('./style.css')

const columns = [
  {
    heading: '',
    name: 'selected'
  },
  {
    heading: 'First name',
    name: 'firstName'
  },
  {
    heading: 'Last name',
    name: 'lastName'
  },
  {
    heading: 'Job title',
    name: 'title'
  },
  {
    heading: 'Company',
    name: 'company'
  },
  {
    heading: 'Email',
    name: 'email'
  },
  {
    heading: 'Source',
    name: 'source'
  }
]

const SurveyQuestionConnections = props => {
  // const style = getStyle()
  const question = _get(props, 'question')
  const connections = _get(props, 'connections')
  const basket = _get(props, 'basket')
  const onToggle = _get(props, 'onToggle')
  const onRemove = _get(props, 'onRemove')

  const cellRenderer = (column, row, defaultValue) => {
    switch (column.name) {
      case 'email':
        return row.person.email
      case 'selected':
        return (
          <input
            type='checkbox'
            checked={row.selected}
            onChange={onToggle(question.id, row.id)}
          />
        )
      default:
        return defaultValue
    }
  }
  const tableData = connections.map(connection => {
    return merge(connection, {
      selected: basket.includes(connection.id)
    })
  })

  return (
    <div>
      <Table data={tableData} columns={columns} cellRenderer={cellRenderer} />
      <div>
        <h4>Basket</h4>
        <ul>
          {basket.map(id => {
            const connection = _find(connections, { id })
            return (
              <li key={connection.id}>
                {connection.firstName} {connection.lastName}{' '}
                <button onClick={onRemove(question.id, id)}>Remove</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

module.exports = SurveyQuestionConnections
