const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Redirect } = require('react-router')
const Dropzone = require('react-dropzone')

const {
  setNetwork,
  setActive,
  parse,
  upload
} = require('./actions')
const LayoutPage = require('../../components/layout-page')
const getStyle = require('./style.css')

const networkChoices = [
  {
    name: 'linkedin',
    label: 'LinkedIn',
    selected: true
  },
  {
    name: 'facebook',
    label: 'Facebook',
    disabled: true
  },
  {
    name: 'google',
    label: 'Google Contacts',
    disabled: true
  }
]

function onNetworkSelect (dispatch) {
  return (event) => dispatch(setNetwork(event.target.value))
}

function onSetActive (dispatch, active) {
  return (event) => dispatch(setActive(active))
}

function onUploadFile (dispatch) {
  return (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      return
    }
    return dispatch(parse(acceptedFiles[0]))
  }
}

function onUpload (dispatch) {
  return () => {
    dispatch(upload())
  }
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

function stepPreview (dispatch, style, props, state) {
  const connections = get(state, 'connections', [])

  const uploading = state.uploading

  let className = style.uploadPreview
  let overlay = <span />

  if (uploading) {
    className = style.uploadPreviewUploading
    overlay = (
      <div className={style.loadingOverlay}>
        <div className='spinner' />
      </div>
    )
  }

  return (
    <div className={className}>
      <div className={style.instructionsCard}>
        <p className={style.instructionsMajorHeading}>
          Contacts found{' '}
          <span className={style.highlight}>({connections.length})</span>
        </p>
        <table className={style.uploadTable}>
          <thead className={style.uploadTableHead}>
            <tr className={style.uploadTableRow}>
              <th className={style.uploadTableHeader}>Email</th>
              <th className={style.uploadTableHeader}>Name</th>
              <th className={style.uploadTableHeader}>Company</th>
              <th className={style.uploadTableHeader}>Title</th>
            </tr>
          </thead>
          <tbody className={style.uploadTableBodyFixedHeight}>
            {connections.map((person, index) => {
              const cellClass =
                index % 2
                  ? style.uploadTableCellEven
                  : style.uploadTableCell
              return (
                <tr key={index} className={style.uploadTableRow}>
                  <td className={cellClass}>
                    <span
                      className={style.uploadTableCellTruncateContent}
                    >
                      {get(person, 'email')}
                    </span>
                  </td>
                  <td className={cellClass}>{`${get(
                    person,
                    'firstName',
                    ''
                  )} ${get(person, 'lastName', '')}`}</td>
                  <td className={cellClass}>{get(person, 'company', '-')}</td>
                  <td className={cellClass}>{get(person, 'title', '-')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={style.buttonContainer}>
          <button
            onClick={onUpload(dispatch)}
            className={style.confirmButton}
          >
            Upload
          </button>
        </div>
        {overlay}
      </div>
    </div>
  )
}

function dropzoneInternal (dispatch, style, props, state, {
  isDragActive,
  isDragReject,
  acceptedFiles,
  rejectedFiles
}) {
  if (isDragActive) {
    return (
      <h5 className={style.dragAndDropHeading}>
        Drop the file to save it!
      </h5>
    )
  }

  if (isDragReject) {
    return (
      <h5 className={style.dragAndDropHeading}>
        This type of file is not accepted
      </h5>
    )
  }

  const connections = state.connections
  const parsing = state.parsing

  // this is just for show
  if (acceptedFiles.length && parsing) {
    return <div className='spinner' />
  }

  if (acceptedFiles.length && connections.length) {
    return (
      <span>
        <h5 className={style.dragAndDropHeading}>File looks ok!</h5>
        <p className={style.dragAndDropCopy}>
          Click the "Next" button to proceed
        </p>
      </span>
    )
  }

  if (acceptedFiles.length && !connections.length) {
    return (
      <span>
        <h5 className={style.dragAndDropHeading}>
          That CSV doesn&apos;t seem to be the one we want
        </h5>
        <p className={style.dragAndDropCopy}>
          Please try uploading{' '}
          <em className={style.dragAndDropCopyEmphasis}>
            Connections.csv
          </em>
        </p>
      </span>
    )
  }

  if (rejectedFiles.length) {
    return (
      <span>
        <h5 className={style.dragAndDropHeading}>
          Seems to be a problem with that file
        </h5>
        <p className={style.dragAndDropCopy}>
          Choose another file or contact us
        </p>
      </span>
    )
  }

  return (
    <span>
      <h5 className={style.dragAndDropHeading}>
        Drag &amp; drop Connections.csv
      </h5>
      <p className={style.dragAndDropFakeLink}>
        Or click to select from computer
      </p>
    </span>
  )
}

function stepUpload (dispatch, style, props, state) {
  const disablePreview = true
  const multiple = false
  return (
    <div className={style.instructionsStepContainer}>
      <div className={style.instructionsCard}>
        <Dropzone
          accept='text/csv'
          disablePreview={disablePreview}
          multiple={multiple}
          className={style.dragAndDrop}
          activeClassName={style.dragAndDropOk}
          rejectClassName={style.dragAndDropNotOk}
          onDrop={onUploadFile(dispatch)}
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) =>
            dropzoneInternal(dispatch, style, props, state, {
              isDragActive,
              isDragReject,
              acceptedFiles,
              rejectedFiles
            })
          }
        </Dropzone>
      </div>
    </div>
  )
}

function renderCurrentStep (dispatch, style, props, state) {
  const active = state.active
  const uploading = state.uploading

  let back = (
    <button
      onClick={onSetActive(dispatch, active - 1)}
      className={style.cancelButton}
    >
      Back
    </button>
  )
  let next = (
    <button
      onClick={onSetActive(dispatch, active + 1)}
      className={style.confirmButton}
    >
      Next
    </button>
  )

  let step

  switch (active) {
    case 0:
      step = (
        <ul>
          {networkChoices.map(network => (
            <li key={network.name}>
              <input id={network.name} value={network.name} name='source' type='radio' defaultChecked={!!network.selected} disabled={!!network.disabled} onChange={onNetworkSelect(dispatch)} />
              <label htmlFor={network.name}>{network.label}</label>
            </li>
          ))}
        </ul>
      )
      back = ''
      break
    case 1:
      step = stepInfoRequest(dispatch, style, props, state)
      break
    case 2:
      step = stepInfoDownload(dispatch, style, props, state)
      break
    case 3:
      step = stepInfoUpload(dispatch, style, props, state)
      break
    case 4:
      step = stepUpload(dispatch, style, props, state)
      next = state.connections.length ? next : (
        <button className={style.confirmButtonDisabled} disabled>
          Next
        </button>
      )
      break
    case 5:
      step = stepPreview(dispatch, style, props, state)
      back = uploading ? <span /> : back
      next = ''
      break
  }

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

function renderCurrentTitles (dispatch, style, props, state) {
  const active = state.active
  let titleText, subtitleText

  switch (active) {
    case 0:
      titleText = 'Choose your network'
      subtitleText = 'One of these'
      break
    case 1:
    case 2:
    case 3:
      titleText = 'Export your connections from LinkedIn'
      subtitleText = "Follow the step-by-step guide below to share your LinkedIn connections with us. Once you do, we'll analyse them to discover who the best people to ask for recommendations are."
      break
    case 4:
      titleText = 'Upload your file'
      subtitleText =
        'Click the box, locate Connections.csv and select it (alternatively you can drag and drop Connections.csv into the box)'
      break
    case 5:
      titleText = 'Check your data'
      subtitleText =
        'To be totally transparent, we wanted to show you the data that you’re uploading to our system, so you can check you’re happy with us using it'
      break
    default:
  }

  return { titleText, subtitleText }
}

const ImportPage = props => {
  const style = getStyle()
  const dispatch = props.dispatch
  const state = props.importPage

  if (state.leaving) {
    return <Redirect to='/connections' push />
  }

  const step = renderCurrentStep(dispatch, style, props, state)
  const { titleText, subtitleText } = renderCurrentTitles(dispatch, style, props, state)
  const headerProps = {
    title: 'Unlocking your network',
    subtitle: 'On-boarding'
  }

  return (
    <LayoutPage {...props} header={headerProps} headline={titleText}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <p className={style.copy}>{subtitleText}</p>
      {step}
    </LayoutPage>
  )
}

module.exports = ImportPage
