const React = require('react')
const get = require('lodash/get')

const Layout = require('../../components/app-layout')
const JobList = require('../../components/job-list')
const Welcome = require('../../components/welcome')

const Home = props => {
  const hirer = get(props, 'user.hirer')
  const Content = hirer ? JobList : Welcome

  return (
    <Layout {...props}>
      <Content {...props} />
    </Layout>
  )
}

module.exports = Home
