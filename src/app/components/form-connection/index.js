const React = require('react')
const get = require('lodash/get')

const ConnectionEditor = (props) => {
  const onChange = get(props, 'onChange')
  const onSubmitCallback = get(props, 'onSubmit', () => {})
  const onSubmit = (event) => {
    event.preventDefault()
    onSubmitCallback()
    return false
  }
  const connection = get(props, 'connection', {})

  return (
    <form onSubmit={onSubmit}>
      <p>
        <label htmlFor='newFirstName'>First name</label>
        <input id='newFirstName' type='text' value={connection.firstName || ''} name='firstName' onChange={onChange('firstName')} />
      </p>
      <p>
        <label htmlFor='newLastName'>Last name</label>
        <input id='newLastName' type='text' value={connection.lastName || ''} name='lastName' onChange={onChange('lastName')} />
      </p>
      <p>
        <label htmlFor='newTitle'>Title</label>
        <input id='newTitle' type='text' value={connection.title || ''} name='title' onChange={onChange('title')} />
      </p>
      <p>
        <label htmlFor='newCompany'>Company</label>
        <input id='newCompany' type='text' value={connection.company || ''} name='company' onChange={onChange('company')} />
      </p>
      <p>
        <label htmlFor='newEmail'>Email</label>
        <input id='newEmail' type='text' value={connection.email || ''} name='email' onChange={onChange('email')} />
      </p>
      <button>Add</button>
    </form>
  )
}

module.exports = ConnectionEditor
