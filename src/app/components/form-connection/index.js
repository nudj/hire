const React = require('react')
const get = require('lodash/get')

const { InputField, Input, Button } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

const fields = [
  {
    name: 'firstName',
    label: 'First name',
    required: true
  },
  {
    name: 'lastName',
    label: 'Last name',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    required: true
  },
  {
    name: 'role',
    label: 'Job title'
  },
  {
    name: 'company',
    label: 'Company'
  }
]

const ConnectionEditor = (props) => {
  const {
    csrfToken,
    onChange,
    onSubmit = () => {}
  } = props

  const onChangeCallback = name => event => {
    onChange(name, event.value)
  }
  const onSubmitCallback = event => {
    event.preventDefault()
    onSubmit()
    return false
  }
  const connection = get(props, 'connection', {})

  return (
    <form action='/' onSubmit={onSubmitCallback}>
      <input name='_csrf' value={csrfToken} type='hidden' />
      {fields.map(field => (
        <InputField
          htmlFor={field.name}
          label={field.label}
          required={field.required}
          key={field.name}
          styleSheet={{ root: style.field }}
        >
          <Input
            onChange={onChangeCallback(field.name)}
            id={field.name}
            name={field.name}
            value={connection[field.name]}
            required
          />
        </InputField>
      ))}
      <Button
        volume='cheer'
        className={css(style.submit)}
        type='submit'
      >
        Add person
      </Button>
    </form>
  )
}

module.exports = ConnectionEditor
