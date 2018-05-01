const React = require('react')

const { Input, Button, InputField } = require('@nudj/components')
const style = require('./style.css')
const { css } = require('@nudj/components/lib/css')

const AddCompanyForm = props => {
  const { onChange, onAddField, values, fieldCount } = props

  const fields = Array.apply(null, { length: fieldCount }).map((_, index) => {
    const key = `email${index}`
    return (
      <Input
        type='email'
        key={key}
        value={values[key] || ''}
        name={key}
        onChange={onChange}
        placeholder='name@example.com'
        styleSheet={{ root: style.field }}
      />
    )
  })

  return (
    <form className={css(style.form)}>
      <InputField
        required
        htmlFor='email'
        label='Email address'
        styleSheet={{
          root: style.fieldLabel
        }}
      >
        {fields}
      </InputField>
      <Button
        subtle
        volume='murmur'
        onClick={onAddField}
        style={style.addFieldButton}
      >
        + Add another
      </Button>
    </form>
  )
}

AddCompanyForm.defaultProps = {
  company: {},
  values: {},
  fieldCount: 3,
  onAddField: () => {},
  onChange: () => {},
  onSubmit: () => {}
}

module.exports = AddCompanyForm
