const React = require('react')
const get = require('lodash/get')

const { Input, Button } = require('@nudj/components')
const style = require('./style.css')
const { css } = require('@nudj/components/lib/css')

const AddCompanyForm = props => {
  const { onChange, company, onSubmit } = props

  return (
    <form onSubmit={onSubmit} className={css(style.form)}>
      <Input
        id='name'
        value={get(company, 'name', '')}
        name='name'
        onChange={onChange}
        placeholder='e.g., Apple'
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
