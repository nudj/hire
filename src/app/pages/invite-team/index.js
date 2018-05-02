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
  submitInvitations
} = require('./actions')

const onChange = dispatch => ({ name, value }) => {
  dispatch(setFieldValue(name, value))
}

const onAddField = dispatch => () => {
  dispatch(addAdditionalField())
}

const onSubmit = dispatch => event => {
  event.preventDefault()
  dispatch(submitInvitations())
}

const InviteTeamPage = props => {
  const { inviteTeamPage: state, dispatch } = props
  const { fieldValues, fieldCount } = state

  return (
    <Layout {...props}>
      <Helmet>
        <title>Invite team</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading>
            Invite your team to nudj
          </Heading>
          <Para>
            With more people at your company on nudj, you have a greater chance of finding someone awesome to hire.
          </Para>
        </Section>
        <Section padding width='regular'>
          <Card>
            <InviteForm
              fieldCount={fieldCount}
              values={fieldValues}
              onChange={onChange(dispatch)}
              onAddField={onAddField(dispatch)}
              onSubmit={onSubmit(dispatch)}
            />
          </Card>
          <Button
            onClick={onSubmit(dispatch)}
            volume='cheer'
            style={style.sendInvitesButton}
          >
            Send invites
          </Button>
        </Section>
        <Section padding>
          <Link
            subtle
            inline
            volume='cheer'
            href='/get-started'
          >
            I&apos;ll do this later
          </Link>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = InviteTeamPage
