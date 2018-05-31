const React = require('react')
const { Helmet } = require('react-helmet')

const Layout = require('../../components/app-layout')
const adminStyle = require('./admin.css')
const teamMemberStyle = require('./team-member.css')

const AdminContent = require('./admin')
const TeamMemberContent = require('./team-member')

const WelcomePage = props => {
  const { hirerTypes } = props.enums
  const { hirer } = props.user
  const onAdminJourney = !hirer || hirer.type === hirerTypes.ADMIN

  return (
    <Layout {...props}>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      { onAdminJourney ? (
        <AdminContent {...props} style={adminStyle} />
      ) : (
        <TeamMemberContent {...props} style={teamMemberStyle} />
      ) }
    </Layout>
  )
}

module.exports = WelcomePage
