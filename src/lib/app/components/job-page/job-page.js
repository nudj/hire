const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const filter = require('lodash/filter')
const style = require('./job-page.css')
const Form = require('../form/form')
const PageHeader = require('../page-header/page-header')
const RowItem = require('../row-item/row-item')

module.exports = class JobPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: get(props, 'recommendations', []).map((person) => get(person, 'id'))
    }
    this.onClickAdd = this.onClickAdd.bind(this)
    this.onClickToggleAll = this.onClickToggleAll.bind(this)
  }
  onClickAdd (event) {
    let selected = this.state.selected
    if (event.target.checked) {
      if (!selected.includes(event.target.value)) {
        selected = selected.concat(event.target.value)
      }
    } else {
      selected = filter(selected, (value) => value !== event.target.value)
    }
    this.setState({
      selected
    })
  }
  onClickToggleAll (event) {
    let selected = this.state.selected
    let recommendations = get(this.props, 'recommendations', [])
    if (selected.length !== recommendations.length) {
      selected = recommendations.map((person) => person.id)
    } else {
      selected = []
    }
    this.setState({
      selected
    })
  }
  recommendationList () {
    return (
      <ul className={style.recommendations}>
        {get(this.props, 'recommendations', []).map((person) => {
          return (
            <RowItem
              key={`${get(person, 'firstName')} ${get(person, 'lastName')}`.split(' ').join('-').toLowerCase()}
              title={`${get(person, 'firstName')} ${get(person, 'lastName')}`}
              details={[{
                term: 'Title',
                description: get(person, 'title')
              }, {
                term: 'Company',
                description: get(person, 'company')
              }]}
              actions={[
                <a href={get(person, 'url')}>View profile</a>,
                <input type='checkbox' name='recipients' value={get(person, 'id')} checked={this.state.selected.includes(get(person, 'id'))} onChange={this.onClickAdd} id={`add-${get(person, 'id')}`} />
              ]}
            />
          )
        })}
      </ul>
    )
  }
  render () {
    return (
      <Form className={style.body} action={`/jobs/${get(this.props, 'job.slug')}/compose`} method='post'>
        <PageHeader
          title={get(this.props, 'job.title')}
          subtitle={<Link to={`/${get(this.props, 'company.slug')}`}>
            {get(this.props, 'company.name')}
          </Link>}
        >
          <p className={style.selected}>{this.state.selected.length} Selected</p>
          <button className={style.submit}>Write message</button>
        </PageHeader>
        <p>We recommend sending a nudj request to ...</p>
        <div className={style.content}>
          <div className={style.main}>
            <input type='hidden' name='_csrf' value={this.props.csrfToken} />
            <label className={style.toggleAll} htmlFor='toggle-all'>Toggle all</label>
            <input type='checkbox' checked={this.state.selected.length === get(this.props, 'recommendations', []).length} onChange={this.onClickToggleAll} id='toggle-all' />
            {this.recommendationList()}
          </div>
          <div className={style.sidebar}>
            Sidebar yo
          </div>
        </div>
      </Form>
    )
  }
}
