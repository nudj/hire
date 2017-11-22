const React = require('react')
const { Helmet } = require('react-helmet')

const LayoutPage = require('../../components/layout-page')

const ConversationsPage = (props) => {
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
    title: 'Conversations',
    subtitle: 'Your conversation history'
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
      headline='Conversations list goes here'
    >
      <Helmet>
        <title>nudj - Conversations</title>
      </Helmet>
    </LayoutPage>
  )
}

module.exports = ConversationsPage
