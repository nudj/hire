const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')

const LayoutApp = require('../../components/layout-app')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')

const getStyle = require('./style.css')

const HirerSurvey = (props) => {
  const style = getStyle()
  const title = 'Time to enter your mind palace'
  const subtitle = 'This survey will help you uncover all the people worth asking for recommendations, whether they be ex-colleagues or friends, by asking questions you wouldn’t necessarily ask yourself.'
  const tooltip = get(props, 'tooltip')
  const surveyUrl = get(props, 'survey.link', 'about:blank')
  const surveyFrame = (<iframe src={surveyUrl} className={style.surveyFrame} />)

  return (
    <LayoutApp {...props} className={style.pageBody}>
      <Helmet>
        <title>nudj - Complete your survey</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={props.csrfToken} />
      <PageHeader
        title='Complete your survey'
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
