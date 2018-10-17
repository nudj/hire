const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, InputField, Button, Modal, Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const Dropdown = require('../../components/dropdown')
const {
  showDeleteModal,
  deleteHirer
} = require('./actions')
const { closeDropdown } = require('../../redux/actions/dropdowns')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

function fetchName ({ firstName, lastName }) {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  } else {
    return firstName || lastName
  }
}

class HirerPage extends React.Component {
  handleClickDelete = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(closeDropdown())
    dispatch(showDeleteModal())
  }

  handleCancelDelete = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(showDeleteModal(false))
  }

  handleConfirmDelete = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(deleteHirer())
  }

  render () {
    const { hirerPage: state, user } = this.props
    const hirer = get(user, 'hirer.company.hirer', {})
    const title = 'Teammate details'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <TitleCard
              title={title}
              titleRight={(
                <Dropdown
                  id='teammate'
                  header='Actions'
                  chevron
                >
                  <Link
                    href={`/team/${hirer.id}/edit`}
                    subtle
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={this.handleClickDelete}
                    volume='scream'
                    subtle
                  >
                    Remove
                  </Button>
                </Dropdown>
              )}
            >
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='person'
                label='Name'
              >
                <Text id='person'>{`${fetchName(hirer.person)} (${hirer.person.email})`}</Text>
              </InputField>
              <InputField
                styleSheet={inputFieldStylesheet}
                htmlFor='type'
                label='Type'
              >
                <Text id='type'>{hirer.type}</Text>
              </InputField>
            </TitleCard>
          </Section>
          <Modal
            isOpen={state.deleteModalVisible}
            style={style.modalWindow}
            onRequestClose={this.handleCancelDelete}
          >
            <TitleCard title='Remove teammate'>
              <Text style={style.modalPara} element='p'>You are about to remove {fetchName(hirer.person)} ({hirer.person.email}) from your organisation. You can reinvite them later if you change your mind.</Text>
              <Text style={style.modalPara} element='p'>Are you sure you want to proceed?</Text>
              <div className={css(style.buttonList)}>
                <Button
                  style={style.button}
                  onClick={this.handleCancelDelete}
                >
                  Cancel
                </Button>
                <Button
                  style={style.button}
                  volume='scream'
                  onClick={this.handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </TitleCard>
          </Modal>
        </Main>
      </Layout>
    )
  }
}

module.exports = HirerPage
