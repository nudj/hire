const React = require('react')
const { Switch, Route } = require('react-router-dom')
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
const Loading = require('../loading/loading')

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

const Page = (props) => {
  let page

  switch (true) {
    case !!get(props, 'error'):
      page = (
        <Status code={get(props, 'error.code')}>
          <PageNotFound {...props} />
        </Status>
      )
      break
    case !!get(props, 'loading'):
      page = <Loading />
      break
    default:
      page = (
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

  return page
}

module.exports = Page
