const React = require('react')
const get = require('lodash/get')

const FormStep = require('../form-step/form-step')

const FormStepLength = (props) => {
  const onSubmitStep = props.onSubmitStep('selectLength')
  const options = [
    {
      icon: 'message-bubble.svg',
      title: 'Short and sweet',
      text: 'For getting straight to the point.',
      selected: get(props, `${get(props, 'name')}.type`) === 'short',
      onClick: (event) => {
        event.stopPropagation()
        onSubmitStep({
          type: 'short',
          title: 'Short and sweet',
          message: 'For getting straight to the point.'
        })
      }
    },
    {
      icon: 'detail-icon.svg',
      title: 'A bit more detail',
      text: 'For when you need to add extra info.',
      selected: get(props, `${get(props, 'name')}.type`) === 'long',
      onClick: (event) => {
        event.stopPropagation()
        onSubmitStep({
          type: 'long',
          title: 'A bit more detail',
          message: 'For when you need to add extra info.'
        })
      }
    }
  ]

  return <FormStep
    {...props}
    options={options}
    title='Select length'
    placeholder='Placeholder goes here'
  />
}

module.exports = FormStepLength
