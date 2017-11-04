const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const LayoutApp = require('../../components/layout-app')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const TaskList = require('../../components/tasks/task-list')
const { toggleCompleted } = require('./actions')

function onClickToggleCompleted (dispatch) {
  return (event) => {
    event.preventDefault()
    dispatch(toggleCompleted())
  }
}

function renderIncompleteContent (incompleteTasks, props, style) {
  let content

  if (!incompleteTasks.length) {
    content = <p className={style.incompleteEmpty}>Doesn't look like there are any tasks for you to complete, check back soon.</p>
  } else {
    content = <TaskList tasks={incompleteTasks}
      hirers={get(props, 'hirers', [])}
      people={get(props, 'people', [])}
      person={get(props, 'person')}
    />
  }

  return (
    <div>
      <h3 className={style.taskGroupTitle}>To do <span className={style.taskGroupTitleHighlight}>({incompleteTasks.length})</span></h3>
      {content}
    </div>
  )
}

function renderCompletedContent (completeTasks, props, style) {
  return (
    <div>
      <h3 className={style.taskGroupTitle}>Completed tasks <span className={style.taskGroupTitleHighlight}>({completeTasks.length})</span></h3>
      <TaskList tasks={completeTasks}
        hirers={get(props, 'hirers', [])}
        people={get(props, 'people', [])}
        person={get(props, 'person')}
      />
    </div>
  )
}

const TasksPage = (props) => {
  const style = getStyle()
  const dispatch = get(props, 'dispatch')
  const state = get(props, 'tasksPage')
  const tooltip = get(props, 'tooltip')
  const firstName = get(props, 'person.firstName', '')
  const completedVisible = get(state, 'completedVisible')

  const personTasks = get(props, 'person.tasks', [])
  const companyTasks = get(props, 'person.company.tasks', [])
  const allTasks = personTasks.concat(companyTasks)
  const allIncompleteTasks = allTasks.filter(task => !task.completed)
  const allCompleteTasks = allTasks.filter(task => task.completed)
  const incompleteContent = renderIncompleteContent(allIncompleteTasks, props, style)

  return (
    <LayoutApp {...props} className={style.pageBody}>
      <Helmet>
        <title>nudj - Tasks</title>
      </Helmet>
      <PageHeader title='Tasks' />
      <h3 className={style.pageHeadline}>Welcome, {firstName}!</h3>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          {incompleteContent}
          {completedVisible ? renderCompletedContent(allCompleteTasks, props, style) : ''}
          {allCompleteTasks.length ? <button onClick={onClickToggleCompleted(dispatch)} className={style.completedVisibleButton}>{completedVisible ? 'Hide' : 'Show'} completed</button> : ''}
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </LayoutApp>
  )
}

module.exports = TasksPage
