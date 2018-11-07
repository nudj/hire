const React = require('react')
const { Helmet } = require('react-helmet')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const find = require('lodash/find')

const {
  Text,
  List,
  Align,
  Button
} = require('@nudj/components')
const { mss, css } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const Main = require('../../components/main')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const style = require('./style.css')

const title = 'Integrations'

const CompanyIntegrations = props => {
  const { integrationTypes } = props

  const isIntegrated = type => {
    const integrations = get(props, 'user.hirer.company.integrations')
    return !!find(integrations, { type })
  }

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Main>
        <Section>
          <TitleCard title={title}>
            <Text element='p' style={style.descriptionParagraph}>
              Integrations allow you to sync nudj with another service, so that that you can manage everything in one place.
            </Text>
          </TitleCard>
          <List style={mss.mtReg}>
            {ListItem => (
              <ListItem joined>
                <Link to='/integrations/greenhouse' className={css(style.card)}>
                  <Align
                    leftChildren={(
                      <div>
                        <div className={css(style.titleContainer)}>
                          <Text element='div' size='largeI' style={style.title} nonsensitive>
                            Greenhouse
                          </Text>
                        </div>
                        <Text element='span' size='smallI' style={style.subtitle} nonsensitive>
                          Sync applicants, candidates & referrals
                        </Text>
                      </div>
                    )}
                    rightChildren={(
                      <Button style={mss.paSmIi} volume={isIntegrated(integrationTypes.GREENHOUSE) ? 'shout' : 'cheer'}>
                        {isIntegrated(integrationTypes.GREENHOUSE) ? 'Connected' : 'Connect'}
                      </Button>
                    )}
                  />
                </Link>
              </ListItem>
            )}
          </List>
        </Section>
      </Main>
    </Layout>
  )
}

module.exports = CompanyIntegrations
