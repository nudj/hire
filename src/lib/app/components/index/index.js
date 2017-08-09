const React = require('react')
const { Switch, Route } = require('react-router-dom')
const { Helmet } = require('react-helmet')
const getStyle = require('./index.css')
const Header = require('../header/header')
const Message = require('../message/message')
const Notification = require('../notification/notification')
const JobsPage = require('../jobs-page/jobs-page')
const JobPage = require('../job-page/job-page')
const Nudj = require('../nudj/nudj')
const ComposePage = require('../compose-page/compose-page')
const SelectReferrerExternalPage = require('../select-referrer-external-page/select-referrer-external-page')
const ComposeExternalPage = require('../compose-external-page/compose-external-page')
const ImportContactsLinkedInPage = require('../import-contacts-linkedin-page/import-contacts-linkedin-page')
const PageNotFound = require('../404-page/404-page')
const Overlay = require('../overlay/overlay')
const Status = require('../status/status')
const { PageWithState, WithState } = require('../../lib/with-state')

const Index = () => {
  const style = getStyle()
  return (
    <div className={style.body}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>nudj</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='With your help, nudj connects the best companies with the best people, without any of the faff.' />
        <meta name='title' content='nudj - Stop looking. Start hiring.' />
        <meta property='og:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
        <meta property='twitter:description' content='With your help, we connect the best companies with the best people, without any of the faff.' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content='nudj - Stop looking. Start hiring.' />
        <meta property='twitter:card' content='nudj - Stop looking. Start hiring.' />
        <meta property='twitter:title' content='nudj - Stop looking. Start hiring.' />
        <meta property='og:site_name' content='nudj - Stop looking. Start hiring.' />
        <meta property='twitter:image' content='' />
        <meta property='og:image' content='' />
        <link rel='icon' href='/assets/images/nudj-square.ico' type='image/x-icon' />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css' />
        <link rel='stylesheet' href='/assets/css/reset.css' />
      </Helmet>
      <header className={style.header}>
        <Route path='*' component={WithState(Header)} />
      </header>
      <div className={style.content}>
        <Route path='*' component={WithState(Message)} />
        <Route path='*' component={WithState(Notification)} />
        <Switch>
          <Route exact path='/' component={PageWithState(JobsPage)} />
          <Route exact path='/import-contacts' component={PageWithState(ImportContactsLinkedInPage)} />
          <Route exact path='/:jobSlug' component={PageWithState(JobPage)} />
          <Route exact path='/:jobSlug/nudj' component={PageWithState(Nudj)} />
          <Route exact path='/:jobSlug/internal' component={PageWithState(ComposePage)} />
          <Route exact path='/:jobSlug/external' component={PageWithState(SelectReferrerExternalPage)} />
          <Route exact path='/:jobSlug/external/:recommendationId' component={PageWithState(ComposeExternalPage)} />
          <Route render={PageWithState((props) => <Status code={404}><PageNotFound {...props} /></Status>)} />
        </Switch>
      </div>
      <Route path='*' component={WithState(Overlay)} />
    </div>
  )
}

module.exports = Index
