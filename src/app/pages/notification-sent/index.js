// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const Layout = require('../../components/app-layout')
const Wrapper = require('../../components/wrapper')
const Section = require('../../components/section')
const { Heading, P } = require('../../components/wizard')

const NotificationSentPage = (props: Object) => {
  const email = props.user.email

  return (
    <Layout {...props}>
      <Helmet>
        <title>Email sent</title>
      </Helmet>
      <Wrapper>
        <Section padding>
          <Heading>
            Check your inbox!
          </Heading>
          <P>
            We just sent you an email to {email} so you can continue setting up
            your account on a different device. You should find it in your inbox
            now.
          </P>
        </Section>
      </Wrapper>
    </Layout>
  )
}

module.exports = NotificationSentPage
