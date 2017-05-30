const React = require('react')
const { connect } = require('react-redux')
const { withRouter, Switch, Route } = require('react-router-dom')
const get = require('lodash/get')

const withState = require('../../lib/with-state')

const HomePage = require('../home-page/home-page')
const JobsPage = require('../jobs-page/jobs-page')
const JobPage = require('../job-page/job-page')
const ComposePage = require('../compose-page/compose-page')
const RequestPage = require('../request-page/request-page')
const SelectReferrerExternalPage = require('../select-referrer-external-page/select-referrer-external-page')
const ComposeExternalPage = require('../compose-external-page/compose-external-page')
const PageNotFound = require('../404-page/404-page')

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

const Component = (props) => {
  return get(props, 'error') ? (
    <Status code={get(props, 'error.code')}>
      <PageNotFound {...props} />
    </Status>
  ) : (
    <Switch>
      <Route exact path='/' component={withState(HomePage)} />
      <Route exact path='/request' component={withState(RequestPage)} />
      <Route exact path='/:companySlug' component={withState(JobsPage)} />
      <Route exact path='/:companySlug/:jobSlug' component={withState(JobPage)} />
      <Route exact path='/:companySlug/:jobSlug/internal' component={withState(ComposePage)} />
      <Route exact path='/:companySlug/:jobSlug/external' component={withState(SelectReferrerExternalPage)} />
      <Route exact path='/:companySlug/:jobSlug/external/:recommendationId' component={withState(ComposeExternalPage)} />
      <Route render={withState((props) => <Status code={404}><PageNotFound {...props} /></Status>)} />
    </Switch>
  )
}

module.exports = Component
