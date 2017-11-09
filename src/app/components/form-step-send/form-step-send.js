const React = require('react')
const get = require('lodash/get')

const templater = require('../../lib/templater')
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

  const subject = prismicMessage.subject

  return subject
}

const FormStepSend = (props) => {
  const recipient = encodeURIComponent(get(props, 'pageData.recipient.email', 'tech@nudj.com'))
  const defaultSubject = 'I need your help'
  const prismicSubject = getComposeMessageBaseSubject(props)
  const subject = encodeURIComponent(prismicSubject || defaultSubject)
  const message = encodeURIComponent(renderMessage(props.composeMessage || '', props.pageData))
  const emailLink = `mailto:${recipient}?subject=${subject}&body=${message}`

  let options = [
    {
      type: 'EMAIL',
      link: emailLink,
      icon: 'mail-icons.png',
      title: 'Send it via your default email app',
      text: 'This will open your default mail client on your computer or device (for example, Mail app on Mac).',
      onClick: (event) => {
        event.stopPropagation()
        event.preventDefault()
        props.onSubmitStep('EMAIL', { url: event.currentTarget.href })
      }
    },
    {
      type: 'GMAIL',
      icon: 'New_Logo_Gmail-padding.svg', // includes extra padding so it's the same height as mail-icons.png
      title: 'Sync and send it via Gmail',
      text: 'Sync with your Gmail account to send the message instantly and chat within our app.',
      onClick: (event) => {
        event.stopPropagation()
        event.preventDefault()
        props.onSubmitStep('GMAIL', { url: event.currentTarget.href })
      }
    }
  ]

  const googleAuthenticated = get(props, 'pageData.googleAuthenticated')

  if (googleAuthenticated) {
    options = [
      {
        type: 'GMAIL',
        icon: 'New_Logo_Gmail-padding.svg',
        title: 'Send it via Gmail',
        text: 'Send the message from your personal address instantly.',
        onClick: (event) => {
          event.stopPropagation()
          event.preventDefault()
          props.onSubmitStep('GMAIL', { url: event.currentTarget.href })
        }
      }
    ]
  }

  return <FormStep
    {...props}
    options={options}
    title='Send message'
    placeholder={googleAuthenticated ? 'Send your message.' : 'Tell us how you want to send it, so we can deliver it to you in the format you need.'}
  />
}

module.exports = FormStepSend
