const React = require('react')
const _get = require('lodash/get')

const ConnectionEditor = (props) => {
  const onChange = _get(props, 'onChange')
  const onAdd = _get(props, 'onAdd')
  const connection = _get(props, 'connection', {})

  return (
    <div>
      <ul>
        <li>
          <label htmlFor='newFirstName'>First name</label>
          <input id='newFirstName' type='text' value={connection.firstName || ''} name='firstName' onChange={onChange('firstName')} />
        </li>
        <li>
          <label htmlFor='newLastName'>Last name</label>
          <input id='newLastName' type='text' value={connection.lastName || ''} name='lastName' onChange={onChange('lastName')} />
        </li>
        <li>
          <label htmlFor='newTitle'>Title</label>
          <input id='newTitle' type='text' value={connection.title || ''} name='title' onChange={onChange('title')} />
        </li>
        <li>
          <label htmlFor='newCompany'>Company</label>
          <input id='newCompany' type='text' value={connection.company || ''} name='company' onChange={onChange('company')} />
        </li>
        <li>
          <label htmlFor='newEmail'>Email</label>
          <input id='newEmail' type='text' value={connection.email || ''} name='email' onChange={onChange('email')} />
        </li>
      </ul>
      <button onClick={onAdd}>Add</button>
    </div>
  )
}

module.exports = ConnectionEditor
