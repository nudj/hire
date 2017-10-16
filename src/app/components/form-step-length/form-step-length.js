const React = require('react')
const get = require('lodash/get')

const FormStep = require('../form-step/form-step')

const FormStepLength = (props) => {
  const options = [
    {
      type: 'SHORT',
      icon: 'message-bubble.svg',
      title: 'Short and sweet',
      text: 'For getting straight to the point.',
      selected: get(props, `${get(props, 'name')}`) === 'SHORT',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep('SHORT')
      }
    },
    {
      type: 'LONG',
      icon: 'detail-icon.svg',
      title: 'A bit more detail',
      text: 'For when you need to add extra info.',
      selected: get(props, `${get(props, 'name')}`) === 'LONG',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep('LONG')
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
