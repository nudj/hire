const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const RowItem = require('../../components/row-item/row-item')

const ConnectionsPage = (props) => {
  const style = getStyle()
  const connections = get(props, 'person.connections', [])
  const headerProps = {
    title: 'Your little black book',
    subtitle: 'All your connections at your bec and call',
    children: <Link className={style.add} to='/surveys/aided-recall-baby'>Add connections</Link>
  }

  return (
    <LayoutPage {...props} header={headerProps} headline={`You have ${connections.length} connection${connections.length === 1 ? '' : 's'} so far`}>
      <Helmet>
        <title>nudj - Connections</title>
      </Helmet>
      <ul className={style.list}>
        {connections.map(connection => <RowItem
          key={`${connection.id}`}
          title={`${connection.to.firstName} ${connection.to.lastName}`}
          details={[{
            term: 'Job title',
            description: connection.to.title
          }, {
            term: 'Company',
            description: connection.to.company
          }]}
          actions={[
            <Link className={style.view} to={`/connections/${connection.id}`}>View</Link>
          ]} />)}
      </ul>
    </LayoutPage>
  )
}

module.exports = ConnectionsPage
