/* global Company */
// @flow
const React = require('react')
const get = require('lodash/get')

const { Input, Button } = require('@nudj/components')
const style = require('./style.css')
const { css } = require('@nudj/components/lib/css')

type CompanyFormProps = {
  company: Company,
  onChange: (Object) => void,
  onSubmit: (Object) => void
}

const AddCompanyForm = (props: CompanyFormProps) => {
  const { onChange, company, onSubmit } = props

  return (
    <form onSubmit={onSubmit} className={css(style.form)}>
      <Input
        id='name'
        value={get(company, 'name', '')}
        name='name'
        onChange={onChange}
        required
      />
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
