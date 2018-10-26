const React = require('react')
const { Helmet } = require('react-helmet')
const { format } = require('date-fns')
const { Link: RRLink } = require('react-router-dom')

const { Text, InputField, Link } = require('@nudj/components')
const { css } = require('@nudj/components/styles')
const { getJobUrl, getReferralUrl } = require('@nudj/library')

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

const ReferralPage = props => {
  const { web } = props
  const { company } = props.user.hirer
  const { referral } = company
  const { job } = referral
  const title = 'Referral details'
  const referralUrl = getJobUrl({
    protocol: web.protocol,
    hostname: web.hostname,
    company: company.slug,
    job: job.slug,
    referralId: referral.id
  })
  const shortReferralUrl = getReferralUrl({
    protocol: web.protocol,
    hostname: web.hostname,
    referralId: referral.id
  })
  const hasChildren = !!referral.children.length

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <div className={css(style.referralDetails)}>
            <TitleCard
              title={title}
              actions={
                hasChildren
                  ? Action => [
                    <Action
                      key='notes'
                      Component={RRLink}
                      to={`/referrals?parent=${referral.id}`}
                    >
                      View children ({referral.children.length})
                    </Action>
                  ]
                  : undefined
              }
            >
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='url'
                label='Referral link'
              >
                <Link
                  href={referralUrl}
                  target='_blank'
                  volume='cheer'
                  style={style.link}
                  onClick={stopPropagation}
                  inline
                  subtle
                  external
                >
                  {referralUrl}
                </Link>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='short'
                label='Short referral link'
              >
                <Link
                  href={shortReferralUrl}
                  target='_blank'
                  volume='cheer'
                  style={style.link}
                  onClick={stopPropagation}
                  inline
                  subtle
                  external
                >
                  {shortReferralUrl}
                </Link>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='person'
                label='Generated for'
              >
                <Text id='person'>{`${fetchName(referral.person)} (${referral.person.email})`}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='job'
                label='Job'
              >
                <Text>{referral.job.title}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='referredBy'
                label='Referred by'
              >
                <Text>{referral.parent ? `${fetchName(referral.parent.person)} (${referral.parent.person.email})` : 'nudj'}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='created'
                label='Created'
              >
                <Text>{format(referral.created, 'DD-MM-YYYY')}</Text>
              </InputField>
            </TitleCard>
          </div>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = ReferralPage
