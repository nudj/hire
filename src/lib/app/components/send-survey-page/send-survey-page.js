const React = require('react')
const { Helmet } = require('react-helmet')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const some = require('lodash/some')
const values = require('lodash/values')
const Textarea = require('react-textarea-autosize')
const getStyle = require('./send-survey-page.css')
const PageHeader = require('../page-header/page-header')
const PrismicReact = require('../../lib/prismic-react')
const templater = require('../../../lib/templater')
const { merge } = require('../../../lib')
const Form = require('../form/form')
const DialogConfirm = require('../dialog-confirm-send-internal/dialog-confirm-send-internal')
const Tooltip = require('../tooltip/tooltip')
const {
  showDialog,
  hideDialog,
  postData,
  showLoading
} = require('../../actions/app')
const { emails: validators } = require('../../../lib/validators')

const errorLabel = (className, template) => <p className={className}>{template}</p>

const ComposeEmail = require('../compose-email/compose-email')

module.exports = (props) => <ComposeEmail {...props} />
