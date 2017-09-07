const React = require('react')
const get = require('lodash/get')

const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const FormStep = require('../form-step/form-step')

function renderMessage (content, data) {
  const companySlug = get(data, 'company.slug', '')
  const jobSlug = get(data, 'job.slug', '')
  const referralId = get(data, 'referral.id', '')

  const referralLink = `https://${get(data, 'web.hostname')}/jobs/${companySlug}+${jobSlug}+${referralId}`

  const options = {
    template: content,
    data: {
      company: {
        name: get(data, 'company.name', '')
      },
      job: {
        bonus: get(data, 'job.bonus', ''),
        link: referralLink,
        title: get(data, 'job.title', '')
      },
      recipient: {
        firstname: get(data, 'recipient.firstName', ''),
        lastname: get(data, 'recipient.lastName', '')
      },
      sender: {
        firstname: get(data, 'person.firstName', ''),
        lastname: get(data, 'person.lastName', '')
      }
    },
    pify: content => content.join(''),
    brify: () => '\n'
  }

  return templater.render(options).join('\n\n')
}

function getComposeMessageBaseSubject (props) {
  const {selectLength, selectStyle, messages} = props
  if (!selectLength || !selectStyle) {
    return ''
  }

  if (!messages || !messages.length) {
    return ''
  }

  const prismicMessage = messages.find(message => message.tags.includes(selectLength.toLowerCase()) && message.tags.includes(selectStyle.toLowerCase()))
  const prismicCompose = new PrismicReact(prismicMessage)

  const subject = prismicCompose.fragmentToText({fragment: 'composemessage.composesubject'})

  return subject ? renderMessage(subject, props.pageData) : ''
}

const FormStepSend = (props) => {
  const recipient = encodeURIComponent(get(props, 'pageData.recipient.email', 'tech@nudj.com'))
  const defaultSubject = 'I need your help'
  const prismicSubject = getComposeMessageBaseSubject(props)
  const subject = encodeURIComponent(prismicSubject || defaultSubject)
  const message = encodeURIComponent(renderMessage(props.composeMessage || '', props.pageData))
  const emailLink = `mailto:${recipient}?subject=${subject}&body=${message}`
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${message}`
  const options = [
    {
      type: 'EMAIL',
      link: emailLink,
      icon: 'mail-icons.png',
      title: 'Send it via your default email app',
      text: 'This will open whatever you’ve set as the default mail client on your computer or device (for example, Mail on Mac).',
      onClick: (event) => {
        event.stopPropagation()
        event.preventDefault()
        props.onSubmitStep('EMAIL', { url: event.currentTarget.href })
      }
    },
    {
      type: 'GMAIL',
      link: gmailLink,
      icon: 'New_Logo_Gmail-padding.svg', // includes extra padding so it's the same height as mail-icons.png
      title: 'Send it via Gmail',
      text: 'This will open another window, for you to copy the message, so you can paste into the app of your choice.',
      onClick: (event) => {
        event.stopPropagation()
        event.preventDefault()
        props.onSubmitStep('GMAIL', { url: event.currentTarget.href })
      }
    }
  ]

  return <FormStep
    {...props}
    options={options}
    title='Send message'
    placeholder='Tell us how you want to send it, so we can deliver it to you in the format you need.'
  />
}

module.exports = FormStepSend
