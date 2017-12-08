/* global Company */
// @flow
const React = require('react')
const get = require('lodash/get')

const { Input, InputField, Button } = require('@nudj/components')
const style = require('./style.css')

type CompanyFormProps = {
  company: Company,
  onChange: (Object) => void,
  onSubmit: () => void,
}

const AddCompanyForm = (props: CompanyFormProps) => {
  const { onChange, company, onSubmit } = props
  const onSubmitForm = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={onSubmitForm}>
      <InputField label='Company name' htmlFor='name' required>
        <Input
          id='name'
          value={get(company, 'name', '')}
          name='name'
          onChange={onChange}
        />
      </InputField>
      <Button
        type='submit'
        volume='cheer'
        style={style.addCompanyButton}
      >
        Add company
      </Button>
    </form>
  )
}

AddCompanyForm.defaultProps = {
  company: {},
  onChange: () => {},
  onSubmit: () => {}
}

module.exports = AddCompanyForm
