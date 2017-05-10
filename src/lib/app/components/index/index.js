const React = require('react')
const { Switch, Route, withRouter } = require('react-router-dom')
const { Helmet } = require('react-helmet')
const { connect } = require('react-redux')
const style = require('./index.css')
const Header = require('../header/header')
const Message = require('../message/message')
const HomePage = require('../home-page/home-page')
const JobsPage = require('../jobs-page/jobs-page')
const JobPage = require('../job-page/job-page')
const ComposePage = require('../compose-page/compose-page')
const RequestPage = require('../request-page/request-page')
const PageNotFound = require('../404-page/404-page')
const Footer = require('../footer/footer')

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

const withState = (Page) => {
  return withRouter(connect((state, props) => Object.assign({}, state, props))((props) => {
    return <Page {...props.page} />
  }))
}

const Index = (props) => {
  let { page: data } = props
  data = data || {}
  return (
    <div className={style.body}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Nudj - Stop looking. Start hiring.</title>
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
      </Helmet>
      <header className={style.header}>
        <Route path='*' component={withState(Header)} />
      </header>
      <Route path='*' component={withState(Message)} />
      <div className={style.content}>
        <Switch>
          <Route exact path='/' component={withState(HomePage)} />
          <Route exact path='/request' component={withState(RequestPage)} />
          <Route exact path='/:companySlug' component={withState(JobsPage)} />
          <Route exact path='/:companySlug/:jobSlug' component={withState(JobPage)} />
          <Route exact path='/:companySlug/:jobSlug/compose' component={withState(ComposePage)} />
          <Route render={(props) => (
            <Status code={404}>
              <PageNotFound {...props} {...data} />
            </Status>
          )} />
        </Switch>
      </div>
      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  )
}

module.exports = Index
