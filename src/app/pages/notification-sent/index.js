const React = require('react')
const { Helmet } = require('react-helmet')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { Heading, Para } = require('../../components/wizard')

const NotificationSentPage = props => {
  const email = props.user.email

  return (
    <Layout {...props}>
      <Helmet>
        <title>Email sent</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading fsShow>
            Check your inbox!
          </Heading>
          <Para>
            We just sent you an email to {email} so you can continue setting up
            your account on a different device. You should find it in your inbox
            now.
          </Para>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = NotificationSentPage
