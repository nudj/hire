const React = require('react')
const { Helmet } = require('react-helmet')
const Dropzone = require('../../components/connections-csv-uploader')

const { parse, upload } = require('./actions')
const LayoutPage = require('../../components/layout-page')
const Link = require('../../components/link/link')
const getStyle = require('./style.css')

function onUploadFile (dispatch) {
  return (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      return
    }

    dispatch(parse(acceptedFiles[0]))
  }
}

function onUpload (dispatch) {
  return () => {
    dispatch(upload())
  }
}

function stepUpload (dispatch, style, props, state) {
  const disablePreview = true
  const multiple = false
  return (
    <div className={style.instructionsStepContainer}>
      <div className={style.instructionsCard}>
        <Dropzone
          accept='.csv'
          disablePreview={disablePreview}
          multiple={multiple}
          parsing={state.parsing}
          connections={state.connections}
          onDrop={onUploadFile(dispatch)}
        />
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
