const React = require('react')

const { Input, Button, ScreenReadable } = require('@nudj/components')
const style = require('./style.css')
const { css } = require('@nudj/components/lib/css')

const AddInviteForm = props => {
  const { onChange, onAddField, values, fieldCount } = props

  return (
    <form className={css(style.form)}>
      <fieldset className={css(style.fieldset)}>
        <legend className={css(style.fieldLabel)}>
          Email addresses
          <span className={css(style.asterisk)}>*</span>
        </legend>
        {
          Array.apply(null, { length: fieldCount }).map((_, index) => {
            const key = `email${index}`
            return (
              <div>
                <ScreenReadable>
                  <label htmlFor={key}>Email address {index + 1}</label>
                </ScreenReadable>
                <Input
                  type='email'
                  id={key}
                  key={index}
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
          subtle
          volume='murmur'
          onClick={onAddField}
          style={style.addFieldButton}
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
