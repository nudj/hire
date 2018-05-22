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
  setFieldValue,
  addAdditionalField,
  skipInvitation,
  submitInvitations
} = require('./actions')

class InviteTeamPage extends React.Component {
  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
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
    const { dispatch } = this.props
    dispatch(submitInvitations())
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
              Invite your team to nudj
            </Heading>
            <Para nonsensitive>
              With more people at your company on nudj, you have a greater chance of finding someone awesome to hire.
            </Para>
          </Section>
          <Section padding width='regular'>
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
