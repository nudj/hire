const React = require('react')
const { Helmet } = require('react-helmet')

const { Text, InputField } = require('@nudj/components')
const { css } = require('@nudj/components/styles')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

function fetchName ({ firstName, lastName }) {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  } else {
    return firstName || lastName
  }
}

const IntroPage = props => {
  const { intro } = props.user
  const title = 'Intro details'

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <div className={css(style.introDetails)}>
            <TitleCard title={title}>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='candidate'
                label='Candidate'
              >
                <Text id='candidate'>{`${fetchName(intro.candidate)} (${intro.candidate.email})`}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='introducedBy'
                label='Introduced by'
              >
                <Text>{`${fetchName(intro.person)} (${intro.person.email})`}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='job'
                label='Job'
              >
                <Text>{intro.job.title}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='notes'
                label='Notes'
              >
                <Text>{intro.notes}</Text>
              </InputField>
            </TitleCard>
          </div>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = IntroPage
