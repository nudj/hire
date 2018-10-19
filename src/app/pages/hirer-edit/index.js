const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const { Text, InputField, Select, Button, Link } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')
const Layout = require('../../components/app-layout')
const TitleCard = require('../../components/title-card')
const Main = require('../../components/main')
const Section = require('../../components/section')
const { createEnumMap } = require('../../lib')
const {
  setFieldValue,
  submitHirer
} = require('./actions')
const { fetchName } = require('../../lib')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

class HirerEditPage extends React.Component {
  handleChange = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(setFieldValue(name, value))
  }

  handleSubmit = event => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(submitHirer())
  }

  render () {
    const { hirerEditPage: state, csrfToken, user, hirerTypeEnums } = this.props
    const hirer = get(user, 'hirer.company.hirer', {})
    const hirerTypes = createEnumMap(hirerTypeEnums.values)
    const title = 'Edit teammate'

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Main>
          <Section>
            <form className={css(style.form)} onSubmit={this.handleSubmit}>
              <TitleCard title={title}>
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
                  required
                >
                  <Select
                    id='type'
                    name='type'
                    value={state.fieldValues.type || hirer.type || hirerTypes.MEMBER}
                    onChange={this.handleChange}
                  >
                    {hirerTypeEnums.values.map(type => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </InputField>
                <input name='_csrf' value={csrfToken} type='hidden' />
                <div className={css(style.buttonList)}>
                  <Link
                    style={style.button}
                    href={`/team/${hirer.id}`}
                  >
                    Cancel
                  </Link>
                  <Button
                    style={style.button}
                    type='submit'
                    volume='cheer'
                  >
                    Save
                  </Button>
                </div>
              </TitleCard>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = HirerEditPage
