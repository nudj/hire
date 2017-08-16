const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')

const getStyle = require('./default.css')

const TaskSendSurveyInternal = (props) => {
  const style = getStyle()
  const tasks = get(props, 'task')
  return (<li className={style.task}>
    <p className={style.text}>Send the survey to your team to unlock their networks</p>
    <Link className={style.action} to='/survey-page'>Action</Link>
  </li>)
}

module.exports = TaskSendSurveyInternal
