const React = require('react')
const { Helmet } = require('react-helmet')

const { Button, Card, Link } = require('@nudj/components')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const InviteForm = require('../../components/form-invite')
const style = require('./style.css')
const {
  Heading,
  Para
} = require('../../components/wizard')
const {
  setNestedFieldValue,
  addAdditionalField,
  skipInvitation,
  submitInvitations
} = require('./actions')

class InviteTeamPage extends React.Component {
  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    const [ person, key ] = name.split('-')
    dispatch(setNestedFieldValue(person, key, value))
  }

  handleAddField = () => {
    const { dispatch } = this.props
    dispatch(addAdditionalField())
  }

  handleSkip = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(skipInvitation())
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch, messageTemplate } = this.props
    dispatch(submitInvitations(messageTemplate))
  }

  render () {
    const { inviteTeamPage: state } = this.props
    const { fieldValues, fieldCount } = state

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Invite team</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Share the job with your team
            </Heading>
            <Para nonsensitive>
              Now that you&apos;ve published your first job it&apos;s time to ask your team for help.
              Enter all the people who you think might know someone good.
            </Para>
          </Section>
          <Section padding width='largeI'>
            <Card>
              <InviteForm
                fieldCount={fieldCount}
                values={fieldValues}
                onChange={this.handleChange}
                onAddField={this.handleAddField}
                onSubmit={this.handleSubmit}
              />
            </Card>
          </Section>
          <Section padding>
            <Button
              nonsensitive
              onClick={this.handleSubmit}
              volume='cheer'
              style={style.sendInvitesButton}
            >
              Send invites
            </Button>
            <Para nonsensitive>
              <Link
                nonsensitive
                subtle
                onClick={this.handleSkip}
                volume='cheer'
                href='/'
              >
                I&apos;ll do this later
              </Link>
            </Para>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = InviteTeamPage
