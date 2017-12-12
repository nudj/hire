const React = require('react')
const { Helmet } = require('react-helmet')
const Dropzone = require('react-dropzone')

const { parse, upload } = require('./actions')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

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

function dropzoneInternal (
  dispatch,
  style,
  props,
  state,
  { isDragActive, isDragReject, acceptedFiles, rejectedFiles }
) {
  if (isDragActive) {
    return (
      <h5 className={style.dragAndDropHeading}>Drop the file to save it!</h5>
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
          <em className={style.dragAndDropCopyEmphasis}>Connections.csv</em>
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
  return (
    <div className={style.pageMain}>
      {stepUpload(dispatch, style, props, state)}
      <div className={style.buttonContainer}>
        <Link
          className={style.cancelButton}
          to={`/setup-network/${props.match.params.network}/`}
        >
          Back
        </Link>
        <button
          onClick={onUpload(dispatch)}
          className={
            state.connections.length
              ? style.confirmButton
              : style.confirmButtonDisabled
          }
          disabled={!state.connections.length}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

const ImportPage = props => {
  const style = getStyle()
  const {
    tooltip,
    user,
    history,
    dispatch,
    overlay,
    dialog,
    onPageLeave,
    notification,
    importUploadPage: state
  } = props
  const step = renderCurrentStep(dispatch, style, props, state)
  const headerProps = {
    title: 'Unlocking your network',
    subtitle: 'On-boarding'
  }

  return (
    <LayoutPage
      tooltip={tooltip}
      user={user}
      history={history}
      dispatch={dispatch}
      overlay={overlay}
      dialog={dialog}
      onPageLeave={onPageLeave}
      notification={notification}
      header={headerProps}
      headline='Upload your file'
    >
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <p className={style.copy}>
        Click the box, locate Connections.csv and select it (alternatively you
        can drag and drop Connections.csv into the box)
      </p>
      {step}
    </LayoutPage>
  )
}

module.exports = ImportPage
