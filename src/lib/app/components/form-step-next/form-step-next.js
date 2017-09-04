const React = require('react')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

const FormStep = require('../form-step/form-step')

const getStyle = require('./form-step-next.css')

const FormStepNext = (props) => {
  const style = getStyle()
  const jobSlug = get(props, 'pageData.job.slug')
  return <FormStep
    {...props}
    title='Next steps'
    placeholder='Let us know what you’d like to do next.'
    content={() => (<div className={style.activeContainerCentered}>
      <p className={style.activeContainerTitle}>Congrats on sending your first message!<br /> What would you like to do next?</p>
      <Link to={`/jobs/${jobSlug}`} className={style.nextStepDashboard}>View job</Link>
      <Link to={`/jobs/${jobSlug}/external`} className={style.nextStepNudj}>Send another nudj</Link>
    </div>)}
  />
}

module.exports = FormStepNext
