const React = require('react')
const { Helmet } = require('react-helmet')

const { Button, Text, Input, CopyString } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const InviteForm = require('../../components/form-invite')
const TitleCard = require('../../components/title-card')
const style = require('./style.css')
const {
  setNestedFieldValue,
  setValue,
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

  handleCopy = () => {
    const { dispatch } = this.props
    dispatch(setValue('hasCopied', true))
  }

  handleCopyBlur = () => {
    const { dispatch } = this.props
    dispatch(setValue('hasCopied', false))
  }

  render () {
    const { invitePage: state } = this.props
    const { fieldValues, fieldCount, hasCopied } = state
    const { company } = this.props.user.hirer
    const { url } = this.props.app

    const invitationLink = `${url.protocol}://${url.hostname}/invitation-accept/${company.hash}`

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Invite team</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard styleSheet={{ card: mss.mbReg }} title='Invite your team to nudj'>
              <Text element='p' style={style.descriptionParagraph}>
                You have a greater chance of finding someone awesome to hire if you get your team involved.
              </Text>
              <Text element='p' style={[style.descriptionParagraph, mss.mb0]}>
                There are two ways to invite them; either add in their email addresses or copy and share the link below however you&apos;d like.
              </Text>
            </TitleCard>
            <TitleCard styleSheet={{ card: mss.mbReg }} title='Email your team'>
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
            <TitleCard styleSheet={{ body: style.body }} title='Share link'>
              <Input
                id='invitation-link'
                value={invitationLink}
                name='invitation-link'
                styleSheet={{ root: style.invitationLink, input: style.invitationInput }}
                readOnly
                nonsensitive
              />
              <CopyString
                onCopy={this.handleCopy}
                onBlur={this.handleCopyBlur}
                volume={hasCopied ? 'murmur' : 'cheer'}
                string={invitationLink}
                subtle
                >
                { hasCopied ? 'Copied!' : 'Copy' }
              </CopyString>
            </TitleCard>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = InviteTeamPage
