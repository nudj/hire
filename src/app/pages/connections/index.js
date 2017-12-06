const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const RowItem = require('../../components/row-item/row-item')

const ConnectionsPage = props => {
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
  const connections = get(user, 'connections', [])
  const headerProps = {
    title: 'Your little black book',
    subtitle: 'All your connections at your bec and call',
    children: [
      <Link
        key="recall"
        className={style.recall}
        to="/surveys/aided-recall-baby"
      >
        Take a survey
      </Link>,
      <Link key="import" className={style.import} to="/setup-network">
        Import connections
      </Link>
    ]
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
      headline={`You have ${connections.length} connection${
        connections.length === 1 ? '' : 's'
      } so far`}
    >
      <Helmet>
        <title>nudj - Connections</title>
      </Helmet>
      <ul className={style.list}>
        {connections.map(connection => (
          <RowItem
            key={`${connection.id}`}
            title={`${connection.firstName} ${connection.lastName}`}
            details={[
              {
                term: 'Job title',
                description: connection.role.name
              },
              {
                term: 'Company',
                description: connection.company.name
              }
            ]}
            actions={[
              <Link className={style.view} to={`/connections/${connection.id}`}>
                View
              </Link>
            ]}
          />
        ))}
      </ul>
    </LayoutPage>
  )
}

module.exports = ConnectionsPage
