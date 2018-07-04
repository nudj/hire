const React = require('react')
const times = require('lodash/times')

const { Input, Button, ScreenReadable } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const mss = require('@nudj/components/lib/css/modifiers.css')

const style = require('./style.css')

const AddInviteForm = props => {
  const { onChange, onSubmit, onAddField, values, fieldCount } = props

  return (
    <form className={css(style.form)} onSubmit={onSubmit}>
      <fieldset className={css(style.fieldset)}>
        <div className={css(style.fieldLabel)}>
          <div className={css(style.label, mss.mrReg)}>
            Email addresses
            <span className={css(style.asterisk)}>*</span>
          </div>
          <div className={css(style.label)}>
            First name
          </div>
        </div>
        {
          times(fieldCount).map((_, index) => {
            const key = `person${index}`
            const emailKey = `${key}-email`
            const nameKey = `${key}-firstName`
            return (
              <div className={css(style.flex)} key={emailKey}>
                <div className={css(style.inputGroup, mss.mrReg)}>
                  <ScreenReadable>
                    <label htmlFor={emailKey}>Email address {index + 1}</label>
                  </ScreenReadable>
                  <Input
                    type='email'
                    id={emailKey}
                    value={(values[key] && values[key].email) || ''}
                    name={emailKey}
                    onChange={onChange}
                    placeholder='name@example.com'
                    styleSheet={{ root: style.field }}
                  />
                </div>
                <div className={css(style.inputGroup)}>
                  <ScreenReadable>
                    <label htmlFor={nameKey}>First name {index + 1}</label>
                  </ScreenReadable>
                  <Input
                    id={nameKey}
                    value={(values[key] && values[key].firstName) || ''}
                    name={nameKey}
                    onChange={onChange}
                    placeholder='Name (optional)'
                    styleSheet={{ root: style.field }}
                  />
                </div>
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
