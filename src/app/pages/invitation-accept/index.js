const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/styles')
const { possessiveCase } = require('@nudj/library')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const Main = require('../../components/main')
const Section = require('../../components/section')
const {
  Heading,
  Para,
  styleSheet: wizardStyles
} = require('../../components/wizard')

const InvitationAcceptPage = (props) => {
  const { company, match } = props

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`Your invite to help ${company.name}`}</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive>
            Join {possessiveCase(company.name)} team on nudj!
          </Heading>
          <Para nonsensitive>
            nudj is a referral platform designed to reward you for helping {company.name} to hire the best talent.
          </Para>
        </Section>
        <Section>
          <ul className={css(style.list)}>
            <li className={css(style.listItem)}>
              <Card style={style.card}>
                <img
                  className={css(style.listItemImage)}
                  src='/assets/images/uncover-gems.svg'
                  alt=''
                />
                <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
                  Own your referrals
                </Text>
                <Text nonsensitive style={style.listItemBody} element='p'>
                  Ensure that you get rewarded with your own trackable links.
                </Text>
              </Card>
            </li>
            <li className={css(style.listItem)}>
              <Card style={style.card}>
                <img
                  className={css(style.listItemImage)}
                  src='/assets/images/unlock-network.svg'
                  alt=''
                />
                <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
                  Explore your network
                </Text>
                <Text nonsensitive style={style.listItemBody} element='p'>
                  Search your LinkedIn connections to find more people worth referring.
                </Text>
              </Card>
            </li>
            <li className={css(style.listItem)}>
              <Card style={style.card}>
                <img
                  className={css(style.listItemImage)}
                  src='/assets/images/send-nudjes.svg'
                  alt=''
                />
                <Text nonsensitive element='div' style={style.listItemHeading} size='largeI'>
                  Get rewarded
                </Text>
                <Text nonsensitive style={style.listItemBody} element='p'>
                  If someone you refer gets the job, the bonus is all yours.
                </Text>
              </Card>
            </li>
          </ul>
        </Section>
        <Section padding>
          <ButtonLink
            nonsensitive
            style={wizardStyles.action}
            href={`${match.url}/accept`}
            volume='cheer'
          >
            Join team
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = InvitationAcceptPage
