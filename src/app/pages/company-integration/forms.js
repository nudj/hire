const React = require('react')
const { InputField, Input, Button } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')
const TitleCard = require('../../components/title-card')
const Loader = require('../../components/staged-loader')
const style = require('./style.css')
const {
  verifyIntegration,
  setFieldValue,
  removeErrors,
  submit
} = require('./actions')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

const onChangeHandler = dispatch => ({ name, value }) => {
  dispatch(removeErrors())
  dispatch(setFieldValue(name, value))
}

const onSubmitHandler = (dispatch, type, method) => event => {
  event.preventDefault()
  dispatch(submit(type, method))
}

const onVerificationHandler = (dispatch, type) => event => {
  event.preventDefault()
  dispatch(verifyIntegration(type))
}

const Greenhouse = props => {
  const { type } = props.match.params
  const { dispatch, companyIntegrationPage: state } = props
  const { integration: existingIntegration } = props.user.hirer.company

  const method = existingIntegration ? 'patch' : 'post'
  const onChange = onChangeHandler(dispatch)
  const onSubmit = onSubmitHandler(dispatch, type, method)
  const onVerifyIntegration = onVerificationHandler(dispatch, type)

  return (
    <TitleCard
      styleSheet={{ card: mss.mtReg }}
      title='Greenhouse credentials'
      titleRight={(
        <Button
          nonsensitive
          onClick={onVerifyIntegration}
          context='secondary'
          disabled={state.syncing || state.verifying}
        >
          {state.verifying ? <Loader messages={['Verifying']} ellipsis /> : 'Verify credentials'}
        </Button>
      )}
    >
      <InputField
        styleSheet={inputFieldStylesheet}
        htmlFor='user'
        label='Authorised user email'
        description='This should belong to an admin user in your Greenhouse account and is used to authorise the integration'
        required
      >
        <Input
          id='user'
          name='user'
          placeholder='greenhouse-admin@example.com'
          onChange={onChange}
          value={state.fieldValues.user}
          error={state.errors.user}
          required
        />
      </InputField>
      <InputField
        styleSheet={inputFieldStylesheet}
        htmlFor='harvestKey'
        label='Harvest API key'
        required
      >
        <Input
          id='harvestKey'
          name='harvestKey'
          placeholder='Paste your Harvest API key here'
          onChange={onChange}
          value={state.fieldValues.harvestKey}
          error={state.errors.harvestKey}
          required
        />
      </InputField>
      <InputField
        styleSheet={inputFieldStylesheet}
        htmlFor='partnerKey'
        label='Partner API key'
        required
      >
        <Input
          id='partnerKey'
          name='partnerKey'
          placeholder='Paste your Partner API key here'
          onChange={onChange}
          value={state.fieldValues.partnerKey}
          error={state.errors.partnerKey}
          required
        />
      </InputField>
      <Button
        nonsensitive
        onClick={onSubmit}
        volume='cheer'
        style={mss.mtReg}
        disabled={state.syncing || state.verifying}
      >
        {existingIntegration ? 'Update' : 'Connect'}
      </Button>
    </TitleCard>
  )
}

module.exports = {
  Greenhouse
}
