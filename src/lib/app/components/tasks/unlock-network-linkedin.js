const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')

const getStyle = require('./default.css')

const TaskUnlockedNetworkLinkedIn = (props) => {
  const style = getStyle()
  const tasks = get(props, 'task')
  return (<li className={style.task}>
    <p className={style.text}>Unlock your network by uploading your LinkedIn contacts</p>
    <Link className={style.action} to='/import-contacts'>Action</Link>
  </li>)
}

module.exports = TaskUnlockedNetworkLinkedIn
