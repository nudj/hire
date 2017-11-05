const React = require('react')
const _get = require('lodash/get')

const Recipients = (props) => {
  const onChange = _get(props, 'onChange')
  const connections = _get(props, 'connections', [])

  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Job title</th>
          <th>Company</th>
          <th>Email</th>
          <th>Source</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {connections.map(person => {
          const {
            id,
            firstName,
            lastName,
            title,
            company,
            email,
            tags
          } = person

          return (
            <tr key={id}>
              <td><input type='text' value={firstName || ''} name='firstName' onChange={onChange(id, 'firstName')} /></td>
              <td><input type='text' value={lastName || ''} name='lastName' onChange={onChange(id, 'lastName')} /></td>
              <td><input type='text' value={title || ''} name='title' onChange={onChange(id, 'title')} /></td>
              <td><input type='text' value={company || ''} name='company' onChange={onChange(id, 'company')} /></td>
              <td><input type='text' value={email || ''} name='email' onChange={onChange(id, 'email')} /></td>
              <td>Survey</td>
              <td>{tags.join(', ')}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

module.exports = Recipients
