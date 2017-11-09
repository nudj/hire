const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const getStyle = require('./style.css')
const LayoutPage = require('../../components/layout-page')
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
    content = <TaskList tasks={incompleteTasks} user={get(props, 'user')} />
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
      <TaskList tasks={completeTasks} user={get(props, 'user')} />
    </div>
  )
}

const TasksPage = (props) => {
  const style = getStyle()
  const dispatch = get(props, 'dispatch')
  const state = get(props, 'tasksPage')
  const firstName = get(props, 'user.firstName', '')
  const completedVisible = get(state, 'completedVisible')

  const userTasks = get(props, 'user.tasks', [])
  const companyTasks = get(props, 'user.hirer.company.tasks', [])
  const allTasks = userTasks.concat(companyTasks)
  const allIncompleteTasks = allTasks.filter(task => !task.completed)
  const allCompleteTasks = allTasks.filter(task => task.completed)
  const incompleteContent = renderIncompleteContent(allIncompleteTasks, props, style)
  const headerProps = {
    title: 'Tasks'
  }

  return (
    <LayoutPage {...props} header={headerProps} headline={`Welcome, ${firstName}!`}>
      <Helmet>
        <title>nudj - Tasks</title>
      </Helmet>
      {incompleteContent}
      {completedVisible ? renderCompletedContent(allCompleteTasks, props, style) : ''}
      {allCompleteTasks.length ? <button onClick={onClickToggleCompleted(dispatch)} className={style.completedVisibleButton}>{completedVisible ? 'Hide' : 'Show'} completed</button> : ''}
    </LayoutPage>
  )
}

module.exports = TasksPage
