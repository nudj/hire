const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')
const getStyle = require('./task-list-page.css')
const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const TaskList = require('../tasks/task-list')

module.exports = class TaskListPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()
    const completedVisible = false
    this.state = {completedVisible}
  }

  toggleCompletedVisible (event) {
    event.preventDefault()
    const completedVisible = !get(this.state, 'completedVisible', true)
    this.setState({completedVisible})
  }

  renderCompletedVisible (completeTasks) {
    if (!completeTasks.length) {
      return (<span />)
    }

    const {completedVisible} = this.state

    if (!completedVisible) {
      return (<button onClick={this.toggleCompletedVisible.bind(this)} className={this.style.completedVisibleButton}>Show completed ({completeTasks.length})</button>)
    }

    return (<div>
      <h3 className={this.style.taskGroupTitle}>Completed tasks <span className={this.style.taskGroupTitleHighlight}>({completeTasks.length})</span></h3>
      <div className={this.style.pageContent}>
        <div className={this.style.pageMain}>
          <TaskList tasks={completeTasks}
            hirers={get(this.props, 'hirers', [])}
            people={get(this.props, 'people', [])}
            person={get(this.props, 'person')} />
        </div>
        <div className={this.style.pageSidebar} />
      </div>
      <button onClick={this.toggleCompletedVisible.bind(this)} className={this.style.completedVisibleButton}>Hide completed</button>
    </div>)
  }

  renderIncompleteContent (incompleteTasks, tooltip) {
    const outstanding = (<h3 className={this.style.taskGroupTitle}>To do <span className={this.style.taskGroupTitleHighlight}>({incompleteTasks.length})</span></h3>)

    if (!incompleteTasks.length) {
      return (<div>
        {outstanding}
        <p className={this.style.incompleteEmpty}>Doesn't look like there are any tasks for you to complete, check back soon.</p>
      </div>)
    }

    return (<div>
      {outstanding}
      <div className={this.style.pageContent}>
        <div className={this.style.pageMain}>
          <TaskList tasks={incompleteTasks}
            hirers={get(this.props, 'hirers', [])}
            people={get(this.props, 'people', [])}
            person={get(this.props, 'person')} />
        </div>
        <div className={this.style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </div>)
  }

  render () {
    const tooltip = get(this.props, 'tooltip')

    const firstName = get(this.props, 'person.firstName', '')

    const incompleteTasks = get(this.props, 'tasks', []).filter(task => !task.completed)
    const incompleteContent = this.renderIncompleteContent(incompleteTasks, tooltip)

    const completeTasks = get(this.props, 'tasks', []).filter(task => task.completed)
    const completedVisibleContent = this.renderCompletedVisible(completeTasks)

    return (
      <div className={this.style.pageBody}>
        <Helmet>
          <title>{`nudj - Tasks`}</title>
        </Helmet>
        <PageHeader title='Tasks' />
        <h3 className={this.style.pageHeadline}>Welcome, {firstName}!</h3>
        {incompleteContent}
        {completedVisibleContent}
      </div>
    )
  }
}
