const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, InputField, Link } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { fetchName } = require('../../lib')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}
const stopPropagation = event => event.stopPropagation()

const ApplicationPage = props => {
  const application = props.user.hirer.company.application
  const title = 'Application details'

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <div className={css(style.applicationDetails)}>
            <TitleCard
              title={title}
              actions={Action => [
                <Action
                  key='notes'
                  Component='a'
                  href={`mailto:${application.person.email}`}
                >
                  Email applicant
                </Action>
              ]}
            >
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='applicant'
                label='Applicant'
              >
                <Text id='person'>{`${fetchName(application.person)} (${application.person.email})`}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='job'
                label='Job'
              >
                <Text>{application.job.title}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='referredBy'
                label='Referred by'
              >
                <Text>{application.referral ? `${fetchName(application.referral.person)} (${application.referral.person.email})` : 'nudj'}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='url'
                label='Url'
              >
                <Text>{application.person.url ? (
                  <Link
                    href={application.person.url}
                    target='_blank'
                    volume='cheer'
                    style={style.link}
                    onClick={stopPropagation}
                    inline
                    subtle
                    external
                  >
                    {application.person.url}
                  </Link>
                ) : 'None'}</Text>
              </InputField>
            </TitleCard>
          </div>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ApplicationPage
