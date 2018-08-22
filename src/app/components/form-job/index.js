const React = require('react')
const dedent = require('dedent')
const values = require('lodash/values')
const capitalize = require('lodash/capitalize')
const omit = require('lodash/omit')

const {
  Button,
  Card,
  Input,
  InputField,
  Textarea,
  Select
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const descriptionPlaceholder = dedent`
  Describe the responsibilities, experience and any requirements for the role and what a candidate might do on a typical day.

  Tip: Try to inject a bit of personality
`

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}
const textareaStylesheet = { input: style.textarea }

const JobForm = props => {
  const {
    edit,
    fieldValues,
    onFieldChange,
    onSubmit,
    csrfToken,
    jobStatusTypes
  } = props
  let allowedStatuses = jobStatusTypes

  if (edit && fieldValues.status !== jobStatusTypes.DRAFT) {
    allowedStatuses = omit(jobStatusTypes, [jobStatusTypes.DRAFT])
  }

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
        {edit && (
          <div className={css(style.field)}>
            <InputField
              styleSheet={inputFieldStylesheet}
              htmlFor='status'
              label='Status'
              required
            >
              <Select
                id='status'
                name='status'
                value={fieldValues.status}
                onChange={onFieldChange}
              >
                {values(allowedStatuses).map(status => (
                  <option key={status} value={status}>
                    {capitalize(allowedStatuses[status])}
                  </option>
                ))}
              </Select>
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
            </InputField>
          </div>
        )}
        <input name='_csrf' value={csrfToken} type='hidden' />
      </Card>
      <Button
        style={mss.mtLgIi}
        type='submit'
        volume='cheer'
      >
        {edit ? 'Save changes' : 'Save draft'}
      </Button>
    </form>
  )
}

module.exports = JobForm
