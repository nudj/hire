// @flow
const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const Layout = require('../../components/app-layout')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const WelcomePage = (props: Object) => (
  <Layout {...props} styleSheet={{root: sharedStyle.root}}>
    <Helmet>
      <title>Welcome</title>
    </Helmet>
    <div className={css(sharedStyle.wrapper)}>
      <div className={css(sharedStyle.header)}>
        <Text element='div' size='largeIi' style={sharedStyle.heading}>
          Welcome to nudj
        </Text>
        <Text element='p' style={sharedStyle.subheading}>
          Before we being, we need you to complete a number of short tasks that
          will maximise your chances of finding someone awesome to hire and work
          with.
        </Text>
      </div>
      <div className={css(sharedStyle.body)}>
        <ul className={css(style.list)}>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={sharedStyle.headingHighlight}>Step 1</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/unlock-network.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Unlock your network
              </Text>
              <Text style={style.listItemBody} element='p'>
                First up, we&#39;ll help you export your connections from
                various sources, so you can get a view of how big your network
                is.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={sharedStyle.headingHighlight}>Step 2</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/uncover-gems.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Uncover gems
              </Text>
              <Text style={style.listItemBody} element='p'>
                We&#39;ll then help your explore your network to uncover people
                worth asking, who will be able to help you find your next hires.
              </Text>
            </Card>
          </li>
          <li className={css(style.listItem)}>
            <Card style={style.card}>
              <Text element='div' size='largeIi' style={sharedStyle.headingHighlight}>Step 3</Text>
              <img
                className={css(style.listItemImage)}
                src='/assets/images/send-nudjes.svg'
                alt=''
              />
              <Text element='div' style={style.listItemHeading} size='largeI'>
                Send nudjes
              </Text>
              <Text style={style.listItemBody} element='p'>
                Finally, we&#39;ll help you help compose and send personalised
                messages to the people you&#39;ve identified.
              </Text>
            </Card>
          </li>
        </ul>
        <ButtonLink
          style={[sharedStyle.action, style.button]}
          href='/setup-network'
          volume='cheer'
        >
          Let&#39;s do this
        </ButtonLink>
      </div>
    </div>
  </Layout>
)

module.exports = WelcomePage
