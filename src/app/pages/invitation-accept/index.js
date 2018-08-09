const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, Card } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
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
  const possessiveCompanyName = possessiveCase(company.name)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`Your invite to help ${company.name}`}</title>
      </Helmet>
      <Main>
        <Section padding>
          <Heading nonsensitive>
            Welcome to {possessiveCompanyName} team on nudj!
          </Heading>
          <Para nonsensitive>
            nudj is a referral plaform to help {company.name} source the best talent for the team.
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
                  Share {possessiveCompanyName} jobs
                </Text>
                <Text nonsensitive style={style.listItemBody} element='p'>
                  Share a trackable link for each of {possessiveCompanyName} jobs, however you want.
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
            Let&#39;s do this
          </ButtonLink>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = InvitationAcceptPage
