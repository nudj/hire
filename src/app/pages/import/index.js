const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { setNetwork } = require('./actions')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

const networkChoices = [
  {
    name: 'linkedin',
    label: 'LinkedIn',
    selected: true
  },
  {
    name: 'facebook',
    label: 'Facebook',
    disabled: true
  },
  {
    name: 'google',
    label: 'Google Contacts',
    disabled: true
  }
]

function onNetworkSelect (dispatch) {
  return (event) => dispatch(setNetwork(event.target.value))
}

const ImportPage = props => {
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    importPage: state
  } = props
  const style = getStyle()
  const nextSegment = get(user, 'hirer.onboarded') ? 'connections' : 'onboarding'

  const headerProps = {
    title: 'Unlocking your network',
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
      headline='Choose your network'
    >
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <p className={style.copy}>One of these</p>
      <ul>
        {networkChoices.map(network => (
          <li key={network.name}>
            <input id={network.name} value={network.name} name='source' type='radio' checked={state.network === network.name} disabled={!!network.disabled} onChange={onNetworkSelect(dispatch)} />
            <label htmlFor={network.name}>{network.label}</label>
          </li>
        ))}
      </ul>
      <div className={style.buttonContainer}>
        {state.network ? (
          <Link to={`/${nextSegment}/import/guide`} className={style.confirmButton}>Next</Link>
        ) : (
          <span className={style.confirmButtonDisabled}>Next</span>
        )}
      </div>
    </LayoutPage>
  )
}

module.exports = ImportPage