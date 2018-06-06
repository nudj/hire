const React = require('react')
const dedent = require('dedent')

const {
  Input,
  InputField,
  Text,
  Textarea
} = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const roleDescriptionPlaceholder = dedent(`
  You will be responsible for executing projects from concept through production
  and delivery, working alongside a global cross-functional team. You must possess
  a keen creative vision, be a great story teller, have the organisational skills of
  a project manager and the pixel-perfect obsession of a designer.
`).replace(/\n/g, ' ')

const experienceRequiredPlaceholder = dedent(`
  You should have proven experience in delivering multi-channel Marketing
  programmes. Experience with Customer Service Marketing is also a bonus.
  You must also be on point with trends in retail, marketing, technology,
  and the world around us.
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
        htmlFor='roleDescription'
        label='Role Description'
        required
      >
        <Textarea
          id='roleDescription'
          placeholder={roleDescriptionPlaceholder}
          name='roleDescription'
          value={fieldValues.roleDescription}
          onChange={onFieldChange}
          styleSheet={textareaStylesheet}
          required
        />
        <Text element='div' nonsensitive style={mss.mtSmIi}>
          Define what this person will do at your company
        </Text>
      </InputField>
      <InputField
        styleSheet={inputFieldStylesheet}
        htmlFor='candidateDescription'
        label='Experience Required'
        required
      >
        <Textarea
          id='candidateDescription'
          placeholder={experienceRequiredPlaceholder}
          name='candidateDescription'
          value={fieldValues.candidateDescription}
          onChange={onFieldChange}
          styleSheet={textareaStylesheet}
          required
        />
        <Text element='div' style={mss.mtSmIi} nonsensitive>
          Outline what experience this person should have
        </Text>
      </InputField>
      <InputField
        styleSheet={inputFieldStylesheet}
        htmlFor='remuneration'
        label='Salary'
        required
      >
        <Input
          id='remuneration'
          placeholder='£500'
          name='remuneration'
          value={fieldValues.remuneration}
          onChange={onFieldChange}
          required
        />
        <Text element='div' style={mss.mtSmIi} nonsensitive>
          If you&apos;d rather not say, just put Competitive
        </Text>
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
    </form>
  )
}

module.exports = JobForm
