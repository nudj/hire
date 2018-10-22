const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const {
  Input,
  Textarea,
  InputField,
  Select,
  Button,
  Text,
  Link,
  Checkbox
} = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  setFieldValue,
  submitIntro
} = require('./actions')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}
const textareaStylesheet = { input: style.textarea }

class EditIntroPage extends React.Component {
  toggleCheckbox = ({ name, value }) => {
    const { dispatch, editIntroPage: state } = this.props
    dispatch(setFieldValue(name, !state.fieldValues.consent))
  }

  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitIntro())
  }

  render () {
    const { editIntroPage: state, csrfToken, user } = this.props
    const jobs = get(user, 'hirer.company.jobs', [])
    const title = 'Add an intro'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <form className={css(style.form)} onSubmit={this.handleSubmit}>
              <TitleCard title={title}>
                <Text element='p' style={style.descriptionParagraph}>
                  Do you know someone who could be a great fit for the team? You can fill in their details below and the hiring team can follow up with them directly.
                </Text>
                <Text element='p' style={style.descriptionParagraph}>
                  Make sure you have their permission before you do.
                </Text>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='job'
                  label='Job'
                  required
                >
                  <Select
                    id='job'
                    name='job'
                    value={state.fieldValues.job}
                    onChange={this.handleChange}
                    required
                  >
                    <option value='' disabled>Choose a job</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </Select>
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='firstName'
                  label='First name'
                  required
                >
                  <Input
                    id='firstName'
                    placeholder='John'
                    name='firstName'
                    value={state.fieldValues.firstName}
                    onChange={this.handleChange}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='lastName'
                  label='Last name'
                  required
                >
                  <Input
                    id='lastName'
                    placeholder='Smith'
                    name='lastName'
                    value={state.fieldValues.lastName}
                    onChange={this.handleChange}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='email'
                  label='Email'
                  required
                >
                  <Input
                    id='email'
                    placeholder='name@example.com'
                    name='email'
                    value={state.fieldValues.email}
                    onChange={this.handleChange}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={inputFieldStylesheet}
                  htmlFor='notes'
                  label='Notes'
                >
                  <Textarea
                    id='notes'
                    name='notes'
                    value={state.fieldValues.notes}
                    onChange={this.handleChange}
                    styleSheet={textareaStylesheet}
                  />
                </InputField>
                <Checkbox
                  id='consent'
                  name='consent'
                  onChange={this.toggleCheckbox}
                  checked={state.fieldValues.consent}
                  styleSheet={{ wrapper: mss.mtReg }}
                  label={(
                    <span>
                      I have consent to share this information.{' '}
                      <Link style={mss.pa0} volume='cheer' subtle href='https://help.nudj.co/referring-a-friend-for-a-job-on-nudj/intros-and-consent'>
                        What does consent mean?
                      </Link>
                    </span>
                  )}
                />
                <input name='_csrf' value={csrfToken} type='hidden' />
                <Button
                  style={mss.mtLgIi}
                  type='submit'
                  volume='cheer'
                  disabled={!state.fieldValues.consent}
                >
                  Save
                </Button>
              </TitleCard>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = EditIntroPage
