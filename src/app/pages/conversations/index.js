const React = require('react')
const { Helmet } = require('react-helmet')

const LayoutPage = require('../../components/layout-page')

const ConversationsPage = (props) => {
  const headerProps = {
    title: 'Conversations',
    subtitle: 'Your conversation history'
  }

  return (
    <LayoutPage {...props} header={headerProps} headline={`Conversations list goes here`}>
      <Helmet>
        <title>nudj - Conversations</title>
      </Helmet>
    </LayoutPage>
  )
}

module.exports = ConversationsPage
