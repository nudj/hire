const React = require('react')
const { Route } = require('react-router-dom')
const { Helmet } = require('react-helmet')
const getStyle = require('./index.css')
const Header = require('../header/header')
const Message = require('../message/message')
const Page = require('../page/page')
const Overlay = require('../overlay/overlay')
const withState = require('../../lib/with-state')

const Index = () => {
  const style = getStyle()
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
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css' />
      </Helmet>
      <header className={style.header}>
        <Route path='*' component={withState(Header)} />
      </header>
      <div className={style.content}>
        <Route path='*' component={withState(Message)} />
        <Route path='*' component={withState(Page)} />
      </div>
      <Route path='*' component={withState(Overlay)} />
    </div>
  )
}

module.exports = Index
