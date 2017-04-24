import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import get from 'lodash/get'
import filter from 'lodash/filter'
import format from 'date-fns/format'
import style from './job-page.css'

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: []
    }
    this.onClickAdd = this.onClickAdd.bind(this)
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
                  <input type='checkbox' name='recommendations' value={get(person, 'id')} checked={this.state.selected.includes(get(person, 'id'))} onChange={this.onClickAdd} id={`add-${get(person, 'id')}`} />
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
      <form className={style.body} action={`/${get(this.props, 'company.slug')}/${get(this.props, 'job.slug')}`} method='POST'>
        <input type='hidden' name='_csrf' value={this.props.csrfToken} />
        <header>
          <h1>{get(this.props, 'job.title')}</h1>
          <h2>@ {get(this.props, 'company.name')}</h2>
          <p className={style.selected}>Selected {this.state.selected.length}</p>
          <button className={style.submit}>Submit</button>
        </header>
        <p>We recommend sending a nudj request to ...</p>
        {this.recommendationList()}
      </form>
    )
  }
}

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
