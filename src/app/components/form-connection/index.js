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
    name: 'title',
    label: 'Job title'
  },
  {
    name: 'company',
    label: 'Company'
  }
]

const FormConnection = (props) => {
  const {
    csrfToken,
    onChange,
    onSubmit,
    style: styleOverride
  } = props

  const getHandleChange = name => event => {
    onChange(name, event.value)
  }
  const getHandleSubmit = event => {
    event.preventDefault()
    onSubmit()
    return false
  }
  const connection = get(props, 'connection', {})

  return (
    <form onSubmit={getHandleSubmit} className={css(styleOverride)}>
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
            onChange={getHandleChange(field.name)}
            id={field.name}
            name={field.name}
            value={connection[field.name] || ''}
            required={field.required}
          />
        </InputField>
      ))}
      <Button
        volume='cheer'
        style={style.submit}
        type='submit'
      >
        Add person
      </Button>
    </form>
  )
}

module.exports = FormConnection
