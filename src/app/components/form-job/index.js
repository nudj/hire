const React = require('react')
const dedent = require('dedent')

const {
  Button,
  Card,
  Input,
  InputField,
  Text,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const descriptionPlaceholder = dedent(`
  You will be responsible for executing projects from concept through production
  and delivery, working alongside a global cross-functional team. You must possess
  a keen creative vision, be a great story teller, have the organisational skills of
  a project manager and the pixel-perfect obsession of a designer.
`).replace(/\n/g, ' ')

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
            placeholder='Marketing specialist'
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
        <InputField
          styleSheet={inputFieldStylesheet}
          htmlFor='bonus'
          label='Referral bonus'
          required
        >
          <Input
            id='bonus'
            placeholder='£500'
            name='bonus'
            value={fieldValues.bonus}
            onChange={onFieldChange}
            required
          />
          <Text element='div' style={mss.mtSmIi} nonsensitive>
            We recommend a bonus of £500
          </Text>
        </InputField>
        <input name='_csrf' value={csrfToken} type='hidden' />
      </Card>
      <Button
        style={mss.mtLgIi}
        type='submit'
        volume='cheer'
      >
        Publish job
      </Button>
    </form>
  )
}

module.exports = JobForm
