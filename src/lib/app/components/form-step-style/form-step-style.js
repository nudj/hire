const React = require('react')

const FormStep = require('../form-step/form-step')

const FormStepStyle = (props) => {
  const onSubmitStep = props.onSubmitStep('selectStyle')
  const options = [
    {
      iconEmoji: '👭',
      title: 'BFFs',
      text: 'You’re inseperable!',
      onClick: () => onSubmitStep({
        type: 'bff',
        title: 'BFFs',
        message: 'You know this person like the back of your hand.'
      })
    },
    {
      iconEmoji: '🤜🤛',
      title: 'Familar',
      text: 'Keep it casual.',
      onClick: () => onSubmitStep({
        type: 'familiar',
        title: 'Familar',
        message: 'Keep it casual.'
      })
    },
    {
      iconEmoji: '🤝',
      title: 'Professional',
      text: 'Stay classy.',
      onClick: () => onSubmitStep({
        type: 'professional',
        title: 'Professional',
        message: 'Stay classy.'
      })
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
