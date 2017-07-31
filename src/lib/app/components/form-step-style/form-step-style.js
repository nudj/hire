const React = require('react')
const get = require('lodash/get')

const FormStep = require('../form-step/form-step')

const FormStepStyle = (props) => {
  const options = [
    {
      type: 'BFF',
      iconEmoji: '👭',
      title: 'BFFs',
      text: 'You’re inseperable!',
      selected: get(props, `${get(props, 'name')}`) === 'BFF',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep('BFF')
      }
    },
    {
      type: 'FAMILIAR',
      iconEmoji: '🤜🤛',
      title: 'Familar',
      text: 'Keep it casual.',
      selected: get(props, `${get(props, 'name')}`) === 'FAMILIAR',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep('FAMILIAR')
      }
    },
    {
      type: 'PROFESSIONAL',
      iconEmoji: '🤝',
      title: 'Professional',
      text: 'Stay classy.',
      selected: get(props, `${get(props, 'name')}`) === 'PROFESSIONAL',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep('PROFESSIONAL')
      }
    }
  ]

  return <FormStep
    {...props}
    options={options}
    title='Select style'
    placeholder='Choose how best to say it.'
  />
}

module.exports = FormStepStyle
