const React = require('react')
const { Helmet } = require('react-helmet')

const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

const OnboardingPage = props => {
  const style = getStyle()
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification
  } = props

  const headerProps = {
    title: 'Welcome',
    subtitle: 'On-boarding'
  }

  return (
    <LayoutPage
      tooltip={tooltip}
      user={user}
      history={history}
      dispatch={dispatch}
      overlay={overlay}
      dialog={dialog}
      onPageLeave={onPageLeave}
      notification={notification}
      header={headerProps}
      headline='Welcome'
    >
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <p className={style.copy}>We&quot;re going to onboard you now</p>
      <div className={style.buttonContainer}>
        <Link fsShow to='/setup-network' className={style.confirmButton}>
          Next
        </Link>
      </div>
    </LayoutPage>
  )
}

module.exports = OnboardingPage
