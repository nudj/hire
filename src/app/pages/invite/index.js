const React = require('react')
const { Helmet } = require('react-helmet')

const { Button, Text } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const InviteForm = require('../../components/form-invite')
const TitleCard = require('../../components/title-card')
const style = require('./style.css')
const {
  setNestedFieldValue,
  addAdditionalField,
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

  handleSubmit = event => {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(submitInvitations())
  }

  render () {
    const { invitePage: state } = this.props
    const { fieldValues, fieldCount } = state

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Invite team</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard title='Get your team on nudj'>
              <Text element='p' style={mss.mbReg}>
                With more people at your company on nudj, you have a greater chance of finding someone awesome to hire.
              </Text>
              <InviteForm
                fieldCount={fieldCount}
                values={fieldValues}
                onChange={this.handleChange}
                onAddField={this.handleAddField}
                onSubmit={this.handleSubmit}
              />
              <Button
                nonsensitive
                onClick={this.handleSubmit}
                volume='cheer'
                style={style.sendInvitesButton}
              >
                Send invites
              </Button>
            </TitleCard>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = InviteTeamPage
