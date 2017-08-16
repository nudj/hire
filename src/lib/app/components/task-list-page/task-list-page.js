const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const format = require('date-fns/format')
const { Helmet } = require('react-helmet')
const getStyle = require('./task-list-page.css')
const PageHeader = require('../page-header/page-header')
const Plural = require('../plural/plural')
const RowItem = require('../row-item/row-item')
const Tooltip = require('../tooltip/tooltip')
const TaskList = require('../tasks/task-list')

const TaskListPage = (props) => {
  const style = getStyle()
  const jobs = get(props, 'jobs', [])
  const tooltip = get(props, 'tooltip')

  const firstName = get(props, 'person.firstName', '')

  // const completeTasks = get(props, 'tasks', []).filter(task => task.completed)
  const incompleteTasks = get(props, 'tasks', []).filter(task => !task.completed)

  return (
    <div className={style.pageBody}>
      <Helmet>
        <title>{`nudj - Tasks`}</title>
      </Helmet>
      <PageHeader title='Tasks' />
      <h3 className={style.pageHeadline}>Welcome, {firstName}! You have {incompleteTasks.length} <Plural singular='task' plural='tasks' count={incompleteTasks.length} /></h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          <TaskList tasks={incompleteTasks} />
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </div>
  )
}

module.exports = TaskListPage
