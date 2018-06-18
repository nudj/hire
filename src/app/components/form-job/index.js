const React = require('react')

const {
  Button,
  Card,
  Input,
  InputField,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const descriptionPlaceholder =
  'Briefly outline the responsibilities and ' +
  'experience required for this role.'

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}
const textareaStylesheet = { input: style.textarea }

const JobForm = props => {
  const { fieldValues, onFieldChange, onSubmit, csrfToken } = props

  return (
    <form className={css(style.form)} onSubmit={onSubmit}>
      <Card style={style.card}>
        <InputField
          styleSheet={inputFieldStylesheet}
          htmlFor='title'
          label='Title'
          required
        >
          <Input
            id='title'
            placeholder='Marketing Manager'
            name='title'
            value={fieldValues.title}
            onChange={onFieldChange}
            required
          />
        </InputField>
        <InputField
          styleSheet={inputFieldStylesheet}
          htmlFor='location'
          label='Location'
          required
        >
          <Input
            id='location'
            placeholder='London'
            name='location'
            value={fieldValues.location}
            onChange={onFieldChange}
            required
          />
        </InputField>
        <InputField
          styleSheet={inputFieldStylesheet}
          htmlFor='description'
          label='Description'
          required
        >
          <Textarea
            id='description'
            placeholder={descriptionPlaceholder}
            name='description'
            value={fieldValues.description}
            onChange={onFieldChange}
            styleSheet={textareaStylesheet}
            required
          />
        </InputField>
        <input name='_csrf' value={csrfToken} type='hidden' />
      </Card>
      <Button
        style={mss.mtLgIi}
        type='submit'
        volume='cheer'
      >
        Save draft
      </Button>
    </form>
  )
}

module.exports = JobForm
