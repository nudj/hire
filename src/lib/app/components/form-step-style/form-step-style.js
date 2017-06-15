const React = require('react')
const get = require('lodash/get')

const FormStep = require('../form-step/form-step')

const FormStepStyle = (props) => {
  const options = [
    {
      iconEmoji: '👭',
      title: 'BFFs',
      text: 'You’re inseperable!',
      selected: get(props, `${get(props, 'name')}.type`) === 'bff',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep({
          type: 'bff',
          title: 'BFFs',
          message: 'You know this person like the back of your hand.'
        })
      }
    },
    {
      iconEmoji: '🤜🤛',
      title: 'Familar',
      text: 'Keep it casual.',
      selected: get(props, `${get(props, 'name')}.type`) === 'familiar',
      onClick: (event) => {
        event.stopPropagation()
          props.onSubmitStep({
          type: 'familiar',
          title: 'Familar',
          message: 'Keep it casual.'
        })
      }
    },
    {
      iconEmoji: '🤝',
      title: 'Professional',
      text: 'Stay classy.',
      selected: get(props, `${get(props, 'name')}.type`) === 'professional',
      onClick: (event) => {
        event.stopPropagation()
        props.onSubmitStep({
          type: 'professional',
          title: 'Professional',
          message: 'Stay classy.'
        })
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
