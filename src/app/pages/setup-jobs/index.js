const React = require('react')
const { Helmet } = require('react-helmet')
const dedent = require('dedent')

const {
  Button,
  Card,
  Input,
  InputField,
  Text,
  Textarea
} = require('@nudj/components')
const { makeSlug } = require('@nudj/library')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para
} = require('../../components/wizard')
const style = require('./style.css')
const {
  onboardCompany,
  setFieldValue,
  submitJob
} = require('./actions')

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

class SetupJobsPage extends React.Component {
  finishOnboarding = () => {
    const { dispatch } = this.props
    dispatch(onboardCompany())
  }

  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleChangeTitle = ({ name, value }) => {
    this.handleChange({ name, value })

    const slug = makeSlug(value)
    const { dispatch } = this.props
    dispatch(setFieldValue('slug', slug))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitJob())
  }

  render () {
    const { setupJobsPage: state } = this.props
    const { fieldValues } = state

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Add your jobs</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
            Add your jobs
            </Heading>
            <Para nonsensitive>
              Add a few details about each role you&apos;re hiring for, and
              we&apos;ll add them to our platform.
            </Para>
          </Section>
          <Section padding width='regular'>
            <Card style={mss.ptSmI}>
              <form className={css(style.form)} onSubmit={this.handleSubmit}>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='title'
                  label='Title'
                  required
                >
                  <Input
                    id='title'
                    placeholder='Marketing specialist'
                    name='title'
                    value={fieldValues.title}
                    onChange={this.handleChangeTitle}
                    styleSheet={{ root: style.field }}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='slug'
                  label='URL Slug'
                  required
                >
                  <Input
                    id='slug'
                    placeholder='marketing-specialist'
                    name='slug'
                    value={fieldValues.slug}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='location'
                  label='Location'
                  required
                >
                  <Input
                    id='location'
                    placeholder='London'
                    name='location'
                    value={fieldValues.location}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    required
                  />
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='roleDescription'
                  label='Role Description'
                  required
                >
                  <Textarea
                    id='roleDescription'
                    placeholder={roleDescriptionPlaceholder}
                    name='roleDescription'
                    value={fieldValues.roleDescription}
                    onChange={this.handleChange}
                    styleSheet={{ input: style.textarea }}
                    required
                  />
                  <Text element='div' nonsensitive style={mss.mtSmIi}>
                    Define what this person will do at your company
                  </Text>
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='candidateDescription'
                  label='Experience Required'
                  required
                >
                  <Textarea
                    id='candidateDescription'
                    placeholder={experienceRequiredPlaceholder}
                    name='candidateDescription'
                    value={fieldValues.candidateDescription}
                    onChange={this.handleChange}
                    styleSheet={{ input: style.textarea }}
                    required
                  />
                  <Text element='div' style={mss.mtSmIi} nonsensitive>
                    Outline what experience this person should have
                  </Text>
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='remuneration'
                  label='Salary'
                  required
                >
                  <Input
                    id='remuneration'
                    placeholder='£500'
                    name='remuneration'
                    value={fieldValues.remuneration}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    required
                  />
                  <Text element='div' style={mss.mtSmIi} nonsensitive>
                    If you&apos;d rather not say, just put Competitive
                  </Text>
                </InputField>
                <InputField
                  styleSheet={{
                    root: style.field,
                    label: style.fieldLabel
                  }}
                  htmlFor='bonus'
                  label='Referral bonus'
                  required
                >
                  <Input
                    id='bonus'
                    placeholder='£500'
                    name='bonus'
                    value={fieldValues.bonus}
                    onChange={this.handleChange}
                    styleSheet={{ root: style.field }}
                    required
                  />
                  <Text element='div' style={mss.mtSmIi} nonsensitive>
                    We recommend a bonus of £500
                  </Text>
                </InputField>
              </form>
            </Card>
          </Section>
          <Section>
            <Button
              nonsensitive
              volume='cheer'
              onClick={this.handleSubmit}
            >
              Save and add another
            </Button>
          </Section>
          <Button
            nonsensitive
            subtle
            volume='cheer'
            onClick={this.finishOnboarding}
          >
            That&apos;s all for now
          </Button>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetupJobsPage
