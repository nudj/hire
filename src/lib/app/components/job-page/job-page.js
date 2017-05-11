const React = require('react')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const filter = require('lodash/filter')
const style = require('./job-page.css')
const Form = require('../form/form')

module.exports = class JobPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: []
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
            <li key={person.id} className={style.person}>
              <dl className={style.details}>
                <dt className={style.detailTitleName}>Name</dt>
                <dd className={style.detailDetailName}>{`${get(person, 'firstName')} ${get(person, 'lastName')}`}</dd>
                <dt className={style.detailTitleTitle}>Title</dt>
                <dd className={style.detailDetailTitle}>{get(person, 'title')}</dd>
                <dt className={style.detailTitleCompany}>Company</dt>
                <dd className={style.detailDetailCompany}>{get(person, 'company')}</dd>
              </dl>
              <ul className={style.actions}>
                <li className={style.action}>
                  <a href={get(person, 'url')}>View profile</a>
                </li>
                <li className={style.action}>
                  <label className={style.addLabel} htmlFor={`add-${get(person, 'id')}`}>Add to senders</label>
                  <input type='checkbox' name='recipients' value={get(person, 'id')} checked={this.state.selected.includes(get(person, 'id'))} onChange={this.onClickAdd} id={`add-${get(person, 'id')}`} />
                </li>
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  render () {
    return (
      <Form className={style.body} action={`/${get(this.props, 'company.slug')}/${get(this.props, 'job.slug')}/compose`} method='post'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <header>
          <h1>{get(this.props, 'job.title')}</h1>
          <h2>@ <Link to={`/${get(this.props, 'company.slug')}`}>{get(this.props, 'company.name')}</Link></h2>
          <p className={style.selected}>Selected {this.state.selected.length}</p>
          <button className={style.submit}>Write message</button>
        </header>
        <p>We recommend sending a nudj request to ...</p>
        <label className={style.toggleAll} htmlFor='toggle-all'>Toggle all</label>
        <input type='checkbox' checked={this.state.selected.length === get(this.props, 'recommendations', []).length} onChange={this.onClickToggleAll} id='toggle-all' />
        {this.recommendationList()}
      </Form>
    )
  }
}
