const React = require('react')
const _get = require('lodash/get')
const _find = require('lodash/find')

// const getStyle = require('./style.css')

const SurveyQuestionConnections = (props) => {
  // const style = getStyle()
  const question = _get(props, 'question')
  const connections = _get(props, 'connections')
  const basket = _get(props, 'basket')
  const onToggle = _get(props, 'onToggle')
  const onRemove = _get(props, 'onRemove')

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <th>First name</th>
            <th>Last name</th>
            <th>Job title</th>
            <th>Company</th>
            <th>Email</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection, index) => {
            const {
              id,
              firstName,
              lastName,
              title,
              company,
              person,
              source
            } = connection

            return (
              <tr key={id}>
                <td><input type='checkbox' checked={basket.includes(connection.id)} onChange={onToggle(question.id, connection.id)} /></td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{title}</td>
                <td>{company}</td>
                <td>{person.email}</td>
                <td>{source}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <h4>Basket</h4>
        <ul>
          {basket.map(id => {
            const connection = _find(connections, { id })
            return <li key={connection.id}>{connection.firstName} {connection.lastName} <button onClick={onRemove(question.id, id)}>Remove</button></li>
          })}
        </ul>
      </div>
    </div>
  )
}

module.exports = SurveyQuestionConnections
