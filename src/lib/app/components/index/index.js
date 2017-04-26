import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import style from './index.css'
import Header from '../header'
import Message from '../message'
import HomePage from '../home-page'
import JobsPage from '../jobs-page'
import JobPage from '../job-page'
import ComposePage from '../compose-page'
import RequestPage from '../request-page'
import PageNotFound from '../404-page'
import Footer from '../footer'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

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
        <link rel='stylesheet' href='/assets/css/app.css' />
      </Helmet>
      <header className={style.header}>
        <Route path='*' component={Header} />
      </header>
      <Route path='*' component={Message} />
      <div className={style.content}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/request' component={RequestPage} />
          <Route exact path='/:companySlug' component={JobsPage} />
          <Route exact path='/:companySlug/:jobSlug' component={JobPage} />
          <Route exact path='/:companySlug/:jobSlug/compose' component={ComposePage} />
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

export default Index
