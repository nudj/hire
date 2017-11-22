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
  const company = get(props, 'company', {})

  return (
    <form onSubmit={onSubmit}>
      <p>
        <label htmlFor='name'>Company name</label>
        <input id='name' type='text' value={company.name || ''} name='name' onChange={onChange('name')} />
      </p>
      <button>Add</button>
    </form>
  )
}

module.exports = ConnectionEditor