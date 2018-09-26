const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const actions = require('@nudj/framework/actions')
const { Button, Checkbox, ListMultiSelect, Modal } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const Layout = require('../../components/app-layout')
const Contact = require('../../components/contact')
const Job = require('../../components/job')
const Main = require('../../components/main')
const Section = require('../../components/section')
const ActionBar = require('../../components/action-bar')
const { Heading, Para } = require('../../components/app')
const { updateTeamSelection } = require('../../redux/actions/selections')
const { sendEmails } = require('./actions')
const styleSheet = require('./style.css')

const getShareButtonCopy = (selected, total) => {
  if (!selected) {
    return 'Share'
  } else if (selected === 1) {
    return 'Share 1 job'
  } else if (selected === total) {
    return 'Share all jobs'
  }

  return `Share ${selected} jobs`
}

const getConfirmationModalCopy = teamMembers => {
  if (!teamMembers.length) {
    return null
  } else if (teamMembers.length > 2) {
    return `
      You're about to send ${teamMembers[0].firstName} and
      ${teamMembers.length - 1} other colleagues an email about these jobs:
    `
  } else if (teamMembers.length === 2) {
    return `
      You're about to send ${teamMembers[0].firstName} and
      ${teamMembers[1].firstName} an email about these jobs:
    `
  }

  return `
    You're about to send ${teamMembers[0].firstName} an email about these jobs:
  `
}

class ShareWithTeamPage extends React.Component {
  state = {
    showConfirmation: false
  }

  componentDidMount () {
    const { history, dispatch, selections, user } = this.props
    const sendSuccess = get(user, 'company.sendJobEmails.success', true)

    if (!sendSuccess) {
      dispatch(actions.app.showNotification({
        type: 'error',
        message: 'Sorry, we didn\'t manage to send your message(s). Please try again or contact support'
      }))
    }

    if (!selections.jobs.length) {
      history.push('/')
    }
  }

  handleTeamChange = ({ values }) => {
    const { dispatch } = this.props
    dispatch(updateTeamSelection(values))
  }

  handleToggleAllTeam = () => {
    const { user, selections } = this.props
    const values = selections.team

    const onboardedTeam = get(user, 'hirer.company.hirers', [])
      .filter(team => team.onboarded && team.person.id !== user.id)
      .map(team => team.person)

    if (values.length !== onboardedTeam.length) {
      const teamIds = onboardedTeam.map(team => team.id)
      this.handleTeamChange({ values: teamIds })
    } else {
      this.handleTeamChange({ values: [] })
    }
  }

  handleConfirm = () => {
    const { dispatch, selections } = this.props

    dispatch(sendEmails({
      jobs: selections.jobs,
      recipients: selections.team
    }))

    this.hideConfirmationModal()
  }

  showConfirmationModal = () => {
    this.setState({
      showConfirmation: true
    })
  }

  hideConfirmationModal = () => {
    this.setState({
      showConfirmation: false
    })
  }

  render () {
    const { showConfirmation } = this.state
    const { user, selections } = this.props

    const onboardedTeam = get(user, 'hirer.company.hirers', [])
      .filter(team => team.onboarded && team.person.id !== user.id)
      .map(team => team.person)

    const selectedJobs = get(user, 'hirer.company.jobs', []).filter(
      job => selections.jobs.includes(job.id)
    )

    const selectedTeam = onboardedTeam.filter(
      team => selections.team.includes(team.id)
    )

    const allTeamSelected = selections.team.length === onboardedTeam.length
    const someTeamSelected = !allTeamSelected && selections.team.length > 0

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Share with your team</title>
        </Helmet>
        <Main>
          <Section padding width='regular'>
            <ActionBar>
              {actionStyle => [
                <Checkbox
                  key='select-all-team'
                  onChange={this.handleToggleAllTeam}
                  checked={allTeamSelected}
                  indeterminate={someTeamSelected}
                  id='select-all-team'
                  name='select-all-team'
                  styleSheet={{
                    wrapper: styleSheet.selectAllCheckboxWrapper,
                    labelContainer: styleSheet.selectAllCheckbox
                  }}
                />,
                <Button
                  key='share-jobs-button'
                  style={actionStyle}
                  volume='cheer'
                  onClick={this.showConfirmationModal}
                  disabled={selections.team.length === 0}
                  subtle
                >
                  {getShareButtonCopy(selections.jobs.length, onboardedTeam.length)}
                </Button>
              ]}
            </ActionBar>
            <ListMultiSelect
              style={mss.mtReg}
              name='team-list'
              onChange={this.handleTeamChange}
              values={selections.team}
              joined
            >
              {listItem => onboardedTeam.map(team => listItem({
                key: team.id,
                id: team.id,
                value: team.id,
                children: (
                  <Contact
                    styleSheet={{
                      root: mss.paReg
                    }}
                    firstName={team.firstName}
                    lastName={team.lastName}
                    email={team.email}
                    role={team.role && team.role.name}
                  />
                )
              }))}
            </ListMultiSelect>
          </Section>
        </Main>
        <Modal
          isOpen={showConfirmation}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          onRequestClose={this.hideConfirmationModal}
          style={mss.center}
        >
          <Heading style={mss.fgPrimary}>
            Are you sure?
          </Heading>
          <Para style={mss.mt0}>
            {getConfirmationModalCopy(selectedTeam)}
          </Para>
          <div className={css(styleSheet.modalJobList)}>
            {selectedJobs.map(job => (
              <Job
                key={job.id}
                {...job}
                styleSheet={{
                  root: styleSheet.modalJobListItem
                }}
              />
            ))}
          </div>
          <div className={css(styleSheet.buttonGroup)}>
            <Button
              style={styleSheet.button}
              onClick={this.hideConfirmationModal}
            >
              Cancel
            </Button>
            <Button
              style={styleSheet.button}
              volume='cheer'
              onClick={this.handleConfirm}
            >
              Send emails
            </Button>
          </div>
        </Modal>
      </Layout>
    )
  }
}

module.exports = ShareWithTeamPage
