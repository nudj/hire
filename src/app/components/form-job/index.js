const React = require('react')
const dedent = require('dedent')
const values = require('lodash/values')
const capitalize = require('lodash/capitalize')
const pick = require('lodash/pick')

const {
  Button,
  Text,
  Input,
  InputField,
  Textarea,
  Select
} = require('@nudj/components')
const TitleCard = require('../title-card')
const { css, mss } = require('@nudj/components/styles')

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
    title,
    description,
    fieldValues,
    onFieldChange,
    onSubmit,
    csrfToken,
    jobStatusTypes
  } = props
  let allowedStatuses = pick(jobStatusTypes, [
    jobStatusTypes.PUBLISHED, jobStatusTypes.ARCHIVED, jobStatusTypes.DRAFT
  ])

  if (edit && fieldValues.status !== jobStatusTypes.DRAFT) {
    allowedStatuses = pick(jobStatusTypes, [jobStatusTypes.PUBLISHED, jobStatusTypes.ARCHIVED])
  }

  return (
    <form className={css(style.form)} onSubmit={onSubmit}>
      <TitleCard title={title}>
        {description && (
          <Text>{description}</Text>
        )}
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
        <Button
          style={mss.mtLgIi}
          type='submit'
          volume='cheer'
        >
          {edit ? 'Save changes' : 'Save draft'}
        </Button>
      </TitleCard>
    </form>
  )
}

module.exports = JobForm
