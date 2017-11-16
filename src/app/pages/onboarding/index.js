const React = require('react')
const { Helmet } = require('react-helmet')

const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

const OnboardingPage = props => {
  const style = getStyle()

  const headerProps = {
    title: 'Welcome',
    subtitle: 'On-boarding'
  }

  return (
    <LayoutPage {...props} header={headerProps} headline='Hi'>
      <Helmet>
        <title>nudj - welcome</title>
      </Helmet>
      <p className={style.copy}>We're going to onboard you now</p>
      <div className={style.buttonContainer}>
        <Link to='/onboarding/import' className={style.confirmButton}>Next</Link>
      </div>
    </LayoutPage>
  )
}

module.exports = OnboardingPage
