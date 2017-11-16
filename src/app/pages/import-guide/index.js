const React = require('react')
const { Helmet } = require('react-helmet')
const { Redirect } = require('react-router')

const { setActive } = require('./actions')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

function onSetActive (dispatch, active) {
  return (event) => dispatch(setActive(active))
}

function stepInfoRequest (dispatch, style, props, state) {
  const imageRoot =
    'https://assets.nudj.co/assets/images/hire/upload-linkedin-contacts'
  return (
    <div className={style.instructionsStepContainer}>
      <div className={style.instructionsStepCard}>
        <h4 className={style.instructionsStepHeading}>
          Step 1 - Requesting your data
        </h4>
        <div className={style.instructionsGroup}>
          <img
            className={style.instructionsImage}
            src={`${imageRoot}/linkedin-step-new-03.png`}
            alt='The LinkedIn Settings &amp; Privacy page with the &quot;Getting an archive of your data&quot; section open'
          />
          <ol className={style.instructionsSteps}>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Click this link - &nbsp; &#x1F449; &nbsp;<a
                  className={style.instructionsCopyLink}
                  href='https://www.linkedin.com/psettings/member-data'
                  target='_blank'
                >
                  Go to LinkedIn settings
                </a>&nbsp; &#x1F448; &nbsp; - to go to your LinkedIn setting
                page (you may need to log in).
              </p>
            </li>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Next, select{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Pick and choose"
                </em>.
              </p>
            </li>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Then select{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Connections"
                </em>{' '}
                and click on{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Request archive"
                </em>.
              </p>
            </li>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Enter your password and click{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Done"
                </em>{' '}
                - the button text will then change to{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Request pending"
                </em>.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function stepInfoDownload (dispatch, style, props, state) {
  const imageRoot =
    'https://assets.nudj.co/assets/images/hire/upload-linkedin-contacts'
  return (
    <div className={style.instructionsStepContainer}>
      <div className={style.instructionsStepCard}>
        <h4 className={style.instructionsStepHeading}>
          Step 2 - Downloading your data
        </h4>
        <div className={style.instructionsGroup}>
          <img
            className={style.instructionsImage}
            src={`${imageRoot}/linkedin-step-05.png`}
            alt='An email from LinkedIn with instructions on how to download your data'
          />
          <ol className={style.instructionsSteps}>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Log into your email account that you use to log into your
                LinkedIn account, you should have received an email from
                LinkedIn with a link to download your data.
              </p>
              <p className={style.instructionsCopy}>
                If it&apos;s not there, give it 10 minutes and check again (it
                may also end up in your spam / junk folder, so it&apos;s worth
                also checking in there if it doesn&apos;t appear immediately).
              </p>
            </li>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Open the email and click the link to download your data - this
                will take you back to LinkedIn Settings page.
              </p>
            </li>
          </ol>
        </div>

        <div className={style.instructionsGroup}>
          <img
            className={style.instructionsImage}
            src={`${imageRoot}/linkedin-step-new-06.png`}
            alt='The LinkedIn Settings &amp; Privacy page with a link to download your data'
          />
          <ol className={style.instructionsSteps} start='3'>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Click on the{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Download archive"
                </em>{' '}
                button and save it where ever you like.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function stepInfoUpload (dispatch, style, props, state) {
  const imageRoot =
    'https://assets.nudj.co/assets/images/hire/upload-linkedin-contacts'
  return (
    <div className={style.instructionsStepContainer}>
      <div className={style.instructionsStepCard}>
        <h4 className={style.instructionsStepHeading}>
          Step 3 - Uploading to nudj
        </h4>
        <div className={style.instructionsGroup}>
          <img
            className={style.instructionsImage}
            src={`${imageRoot}/linkedin-step-new-07.png`}
            alt='The LinkedIn Settings &amp; Privacy page with a link to download your data'
          />
          <ol className={style.instructionsSteps}>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Navigate to where you saved the downloaded file on your
                computer.
              </p>
            </li>
            <li className={style.instructionsStep}>
              <p className={style.instructionsCopy}>
                Then click the{' '}
                <em className={style.instructionsCopyEmphasis}>
                  "Next"
                </em>{' '}
                button below.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function renderCurrentStep (dispatch, style, props, state) {
  const active = state.active
  const nextSegment = props.user.hirer.onboarded ? 'connections' : 'onboarding'
  let step

  switch (active) {
    case 0:
      step = stepInfoRequest(dispatch, style, props, state)
      break
    case 1:
      step = stepInfoDownload(dispatch, style, props, state)
      break
    case 2:
      step = stepInfoUpload(dispatch, style, props, state)
      break
  }

  const back = active ? (
    <button
      onClick={onSetActive(dispatch, active - 1)}
      className={style.cancelButton}
    >
      Back
    </button>
  ) : (
    <Link className={style.cancelButton} to={`/${nextSegment}/import`}>Back</Link>
  )
  const next = active < 2 ? (
    <button
      onClick={onSetActive(dispatch, active + 1)}
      className={style.confirmButton}
    >
      Next
    </button>
  ) : (
    <Link className={style.confirmButton} to={`/${nextSegment}/import/upload`}>Next</Link>
  )

  return (
    <div className={style.pageMain}>
      {step}
      <div className={style.buttonContainer}>
        {back}
        {next}
      </div>
    </div>
  )
}

const ImportPage = props => {
  const style = getStyle()
  const dispatch = props.dispatch
  const state = props.importGuidePage

  if (state.leaving) {
    return <Redirect to='/connections' push />
  }

  const step = renderCurrentStep(dispatch, style, props, state)
  const headerProps = {
    title: 'Unlocking your network',
    subtitle: 'On-boarding'
  }

  return (
    <LayoutPage {...props} header={headerProps} headline='Export your connections from LinkedIn'>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <p className={style.copy}>Follow the step-by-step guide below to share your LinkedIn connections with us. Once you do, we'll analyse them to discover who the best people to ask for recommendations are.</p>
      {step}
    </LayoutPage>
  )
}

module.exports = ImportPage
