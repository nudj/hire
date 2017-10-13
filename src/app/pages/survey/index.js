const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const actions = require('@nudj/framework/actions')

const LayoutApp = require('../../components/layout-app')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
const {
  showDialog
} = actions.app

const getStyle = require('./style.css')

const HirerSurvey = (props) => {
  const style = getStyle()
  const title = 'Complete our survey and jog your memory'
  const subtitle = 'This survey will help you uncover all the people worth asking for recommendations, whether they be ex-colleagues or friends, by asking you questions you wouldn’t necessarily ask yourself.'
  const tooltip = get(props, 'tooltip')
  const surveyUrl = get(props, 'survey.link', 'about:blank')
  const surveyFrame = (<iframe src={surveyUrl} className={style.surveyFrame} />)

  const handlePageLeave = (event) => {
    event.preventDefault()
    let url = event.target.getAttribute('href')

    if (!url) {
      url = '/'
    }

    return props.dispatch(showDialog({
      options: [
        {
          type: 'cancel',
          action: {
            name: 'hideDialog'
          }
        },
        {
          type: 'confirm',
          action: {
            name: 'redirect',
            url
          }
        }
      ]
    }))
  }

  return (
    <LayoutApp {...props} onPageLeave={handlePageLeave} className={style.pageBody}>
      <Helmet>
        <title>nudj - Discover referrers in your network</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={props.csrfToken} />
      <PageHeader
        title='Discover referrers in your network'
        subtitle='On-boarding'
      />
      <h3 className={style.pageHeadline}>{title}</h3>
      <p className={style.copy}>{subtitle}</p>
      <div className={style.pageContent}>
        <div className={style.pageMain}>
          {surveyFrame}
        </div>
        <div className={style.pageSidebar}>
          {tooltip ? <Tooltip {...tooltip} /> : ''}
        </div>
      </div>
    </LayoutApp>
  )
}

module.exports = HirerSurvey
