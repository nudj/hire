// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')

const NotificationSentPage = (props: Object) => {
  const email = props.user.email

  return (
    <Layout {...props} styleSheet={{ root: sharedStyle.root }}>
      <Helmet>
        <title>Email sent</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element="div" size="largeIi" style={sharedStyle.heading}>
            Check your inbox!
          </Text>
          <Text element="p" style={sharedStyle.subheading}>
            We just sent you an email to {email} so you can continue setting up
            your account on a different device. You should find it in your inbox
            now.
          </Text>
        </div>
      </div>
    </Layout>
  )
}

module.exports = NotificationSentPage
