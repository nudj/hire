const React = require('react')
const times = require('lodash/times')

const { Input, Button, ScreenReadable } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

const AddInviteForm = props => {
  const { onChange, onSubmit, onAddField, values, fieldCount } = props

  return (
    <form className={css(style.form)} onSubmit={onSubmit}>
      <fieldset className={css(style.fieldset)}>
        <legend className={css(style.fieldLabel)}>
          Email addresses
          <span className={css(style.asterisk)}>*</span>
        </legend>
        {
          times(fieldCount).map((_, index) => {
            const key = `email${index}`
            return (
              <div key={key}>
                <ScreenReadable>
                  <label htmlFor={key}>Email address {index + 1}</label>
                </ScreenReadable>
                <Input
                  type='email'
                  id={key}
                  value={values[key] || ''}
                  name={key}
                  onChange={onChange}
                  placeholder='name@example.com'
                  styleSheet={{ root: style.field }}
                />
              </div>
            )
          })
        }
        <Button
          volume='murmur'
          onClick={onAddField}
          style={style.addFieldButton}
          nonsensitive
          subtle
        >
          + Add another
        </Button>
      </fieldset>
    </form>
  )
}

AddInviteForm.defaultProps = {
  onAddField: () => {},
  onChange: () => {},
  onSubmit: () => {}
}

module.exports = AddInviteForm
