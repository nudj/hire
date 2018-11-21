const React = require('react')
const { InputField, Input, Button } = require('@nudj/components')
const { mss } = require('@nudj/components/styles')
const TitleCard = require('../../components/title-card')
const style = require('./style.css')
const { setFieldValue, removeErrors } = require('./actions')

const inputFieldStylesheet = {
  root: style.field,
  label: style.fieldLabel
}

const onChangeHandler = dispatch => ({ name, value }) => {
  dispatch(removeErrors())
  dispatch(setFieldValue(name, value))
}

const Greenhouse = props => {
  const {
    dispatch,
    openModal,
    onSubmit,
    verificationErrors = {},
    companyIntegrationPage: state
  } = props
  const { integration: existingIntegration } = props.user.hirer.company

  const onChange = onChangeHandler(dispatch)

  return (
    <TitleCard styleSheet={{ card: mss.mtReg }} title='Greenhouse credentials'>
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
          error={verificationErrors.user}
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
          error={verificationErrors.harvestKey}
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
          error={verificationErrors.partnerKey}
          required
        />
      </InputField>
      <Button
        nonsensitive
        onClick={existingIntegration ? onSubmit : openModal}
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
