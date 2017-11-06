const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Redirect } = require('react-router')
const Dropzone = require('react-dropzone')
const Papa = require('papaparse')

const actions = require('@nudj/framework/actions')
const LayoutApp = require('../../components/layout-app')
const PageHeader = require('../../components/page-header/page-header')
const Tooltip = require('../../components/tooltip/tooltip')
// const loadingStyle = require('../../components/loading/loading.css')()
const getStyle = require('./style.css')

class ImportContactsPage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const active = 1
    const data = []
    const leaving = false
    const parsing = false
    const file = undefined
    const uploading = false
    this.state = {active, data, file, leaving, parsing, uploading}
  }

  componentWillReceiveProps (props) {
    const asset = get(props, 'asset')
    if (asset) {
      const active = 4
      const uploading = false
      this.setState({active, uploading})
    }
  }

  onClickStep (active) {
    return (event) => {
      // this resets data if you reload step 2
      const data = active === 2 ? [] : this.state.data
      const file = active === 2 ? undefined : this.state.file
      this.setState({ active, data, file })
    }
  }

  convertLinkedInToNudjPeople (linkedInData) {
    const nudjData = linkedInData.map(this.convertLinkedInToNudjPerson).filter(person => person.email)
    nudjData.sort((a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : 0)
    return nudjData
  }

  convertLinkedInToNudjPerson (person) {
    return {
      email: get(person, 'Email Address', get(person, 'EmailAddress', '')),
      firstName: get(person, 'First Name', get(person, 'FirstName', '')),
      lastName: get(person, 'Last Name', get(person, 'LastName', '')),
      title: get(person, 'Position'),
      company: get(person, 'Company')
    }
  }

  // This is operating on the premise that we've set multiple=false
  onUploadFile (acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length) {
      return
    }
    const file = acceptedFiles[0]
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const linkedInData = get(results, 'data', [])
        const data = this.convertLinkedInToNudjPeople(linkedInData)
        const parsing = true
        this.setState({data, file, parsing}, () => {
          const parsing = false
          setTimeout(() => this.setState({parsing}), 1000)
        })
      }
    })
  }

  uploadContacts (event) {
    const url = `/import-contacts`
    const method = 'post'
    const data = {
      name: this.state.file.name
    }
    const file = this.state.file

    const uploading = true
    this.setState({uploading})

    this.props.dispatch(actions.app.postFile({ url, data, method, file }))
  }

  cancelUpload (event) {
    const leaving = window.confirm('Do you really want to cancel this?')
    this.setState({leaving})
  }

  stepInfo () {
    const imageRoot = 'https://assets.nudj.co/assets/images/hire/upload-linkedin-contacts'
    return (<div className={this.style.instructionsStepContainer}>
      <div className={this.style.instructionsStepCard}>
        <h4 className={this.style.instructionsStepHeading}>Step 1 - Requesting your data</h4>
        <div className={this.style.instructionsGroup}>
          <img className={this.style.instructionsImage} src={`${imageRoot}/linkedin-step-new-03.png`} alt='The LinkedIn Settings &amp; Privacy page with the "Getting an archive of your data" section open' />
          <ol className={this.style.instructionsSteps}>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Click this link - &nbsp; &#x1F449; &nbsp;<a className={this.style.instructionsCopyLink} href='https://www.linkedin.com/psettings/member-data' target='_blank'>Go to LinkedIn settings</a>&nbsp; &#x1F448; &nbsp; - to go to your LinkedIn setting page (you may need to log in).</p>
            </li>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Next, select <em className={this.style.instructionsCopyEmphasis}>"Pick and choose"</em>.</p>
            </li>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Then select <em className={this.style.instructionsCopyEmphasis}>"Connections"</em> and click on <em className={this.style.instructionsCopyEmphasis}>"Request archive"</em>.</p>
            </li>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Enter your password and click <em className={this.style.instructionsCopyEmphasis}>"Done"</em> - the button text will then change to <em className={this.style.instructionsCopyEmphasis}>"Request pending"</em>.</p>
            </li>
          </ol>
        </div>
      </div>

      <div className={this.style.instructionsStepCard}>
        <h4 className={this.style.instructionsStepHeading}>Step 2 - Downloading your data</h4>
        <div className={this.style.instructionsGroup}>
          <img className={this.style.instructionsImage} src={`${imageRoot}/linkedin-step-05.png`} alt='An email from LinkedIn with instructions on how to download your data' />
          <ol className={this.style.instructionsSteps}>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Log into your email account that you use to log into your LinkedIn account, you should have received an email from LinkedIn with a link to download your data.</p>
              <p className={this.style.instructionsCopy}>If it's not there, give it 10 minutes and check again (it may also end up in your spam / junk folder, so it's worth also checking in there if it doesn't appear immediately).</p>
            </li>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Open the email and click the link to download your data - this will take you back to LinkedIn Settings page.</p>
            </li>
          </ol>
        </div>

        <div className={this.style.instructionsGroup}>
          <img className={this.style.instructionsImage} src={`${imageRoot}/linkedin-step-new-06.png`} alt='The LinkedIn Settings &amp; Privacy page with a link to download your data' />
          <ol className={this.style.instructionsSteps} start='3'>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Click on the <em className={this.style.instructionsCopyEmphasis}>"Download archive"</em> button and save it where ever you like.</p>
            </li>
          </ol>
        </div>
      </div>

      <div className={this.style.instructionsStepCard}>
        <h4 className={this.style.instructionsStepHeading}>Step 3 - Uploading to nudj</h4>
        <div className={this.style.instructionsGroup}>
          <img className={this.style.instructionsImage} src={`${imageRoot}/linkedin-step-new-07.png`} alt='The LinkedIn Settings &amp; Privacy page with a link to download your data' />
          <ol className={this.style.instructionsSteps}>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Navigate to where you saved the downloaded file on your computer.</p>
            </li>
            <li className={this.style.instructionsStep}>
              <p className={this.style.instructionsCopy}>Then click the <em className={this.style.instructionsCopyEmphasis}>"Next"</em> button below.</p>
            </li>
          </ol>
        </div>
      </div>

    </div>)
  }

  stepPreview () {
    const data = get(this.state, 'data', [])

    const uploading = this.state.uploading

    let className = this.style.uploadPreview
    let overlay = (<span />)

    if (uploading) {
      className = this.style.uploadPreviewUploading
      overlay = (<div className={this.style.loadingOverlay}><div className='spinner' /></div>)
    }

    return (<div className={className}>
      <div className={this.style.instructionsCard}>
        <p className={this.style.instructionsMajorHeading}>Contacts found <span className={this.style.highlight}>({data.length})</span></p>
        <table className={this.style.uploadTable}>
          <thead className={this.style.uploadTableHead}>
            <tr className={this.style.uploadTableRow}>
              <th className={this.style.uploadTableHeader}>Email</th>
              <th className={this.style.uploadTableHeader}>Name</th>
              <th className={this.style.uploadTableHeader}>Company</th>
              <th className={this.style.uploadTableHeader}>Title</th>
            </tr>
          </thead>
          <tbody className={this.style.uploadTableBodyFixedHeight}>
            {data.map((person, index) => {
              const cellClass = (index % 2) ? this.style.uploadTableCellEven : this.style.uploadTableCell
              return (<tr key={index} className={this.style.uploadTableRow}>
                <td className={cellClass}><span className={this.style.uploadTableCellTruncateContent}>{get(person, 'email')}</span></td>
                <td className={cellClass}>{`${get(person, 'firstName', '')} ${get(person, 'lastName', '')}`}</td>
                <td className={cellClass}>{get(person, 'company', '-')}</td>
                <td className={cellClass}>{get(person, 'title', '-')}</td>
              </tr>)
            })}
          </tbody>
        </table>
        <div className={this.style.buttonContainer}>
          <button onClick={this.cancelUpload.bind(this)} className={this.style.cancelButton}>Cancel</button>
          <button onClick={this.uploadContacts.bind(this)} className={this.style.confirmButton}>Upload</button>
        </div>
        {overlay}
      </div>
    </div>)
  }

  dropzoneInternal ({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) {
    if (isDragActive) {
      return (<h5 className={this.style.dragAndDropHeading}>Drop the file to save it!</h5>)
    }

    if (isDragReject) {
      return (<h5 className={this.style.dragAndDropHeading}>This type of file is not accepted</h5>)
    }

    const data = this.state.data
    const parsing = this.state.parsing

    // this is just for show
    if (acceptedFiles.length && parsing) {
      return (<div className='spinner' />)
    }

    if (acceptedFiles.length && data.length) {
      return (<span>
        <h5 className={this.style.dragAndDropHeading}>File looks ok!</h5>
        <p className={this.style.dragAndDropCopy}>Click the "Next" button to proceed</p>
      </span>)
    }

    if (acceptedFiles.length && !data.length) {
      return (<span>
        <h5 className={this.style.dragAndDropHeading}>That CSV doesn't seem to be the one we want</h5>
        <p className={this.style.dragAndDropCopy}>Please try uploading <em className={this.style.dragAndDropCopyEmphasis}>Connections.csv</em></p>
      </span>)
    }

    if (rejectedFiles.length) {
      return (<span>
        <h5 className={this.style.dragAndDropHeading}>Seems to be a problem with that file</h5>
        <p className={this.style.dragAndDropCopy}>Choose another file or contact us</p>
      </span>)
    }

    return (<span>
      <h5 className={this.style.dragAndDropHeading}>Drag &amp; drop Connections.csv</h5>
      <p className={this.style.dragAndDropFakeLink}>Or click to select from computer</p>
    </span>)
  }

  stepUpload () {
    const disablePreview = true
    const multiple = false
    return (<div className={this.style.instructionsStepContainer}>
      <div className={this.style.instructionsCard}>
        <Dropzone
          accept='text/csv'
          disablePreview={disablePreview}
          multiple={multiple}
          className={this.style.dragAndDrop}
          activeClassName={this.style.dragAndDropOk}
          rejectClassName={this.style.dragAndDropNotOk}
          onDrop={this.onUploadFile.bind(this)}>
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => this.dropzoneInternal({ isDragActive, isDragReject, acceptedFiles, rejectedFiles })}
        </Dropzone>
      </div>
    </div>)
  }

  renderCurrentStep () {
    const active = this.state.active
    const uploading = this.state.uploading

    let back = (<span />)
    let next = (<span />)

    let step

    switch (active) {
      case 2:
        step = this.stepUpload()
        back = (<button onClick={this.onClickStep(active - 1)} className={this.style.cancelButton}>Back</button>)
        next = this.state.data.length ? (<button onClick={this.onClickStep(active + 1)} className={this.style.confirmButton}>Next</button>) : (<button className={this.style.confirmButtonDisabled} disabled>Next</button>)
        break
      case 3:
        step = this.stepPreview()
        back = uploading ? (<span />) : (<button onClick={this.onClickStep(active - 1)} className={this.style.cancelButton}>Back</button>)
        break
      default:
        step = this.stepInfo()
        next = (<button onClick={this.onClickStep(active + 1)} className={this.style.confirmButton}>Next</button>)
    }

    return (<div className={this.style.pageMain}>
      {step}
      <div className={this.style.buttonContainer}>
        {back}
        {next}
      </div>
    </div>)
  }

  renderCurrentTitles () {
    const active = this.state.active

    let titleText = 'Export your connections from LinkedIn'
    let subtitleText = 'Follow the step-by-step guide below to share your LinkedIn connections with us. Once you do, we\'ll analyse them to discover who the best people to ask for recommendations are.'

    switch (active) {
      case 2:
        titleText = 'Upload your file'
        subtitleText = 'Click the box, locate Connections.csv and select it (alternatively you can drag and drop Connections.csv into the box)'
        break
      case 3:
        titleText = 'Check your data'
        subtitleText = 'To be totally transparent, we wanted to show you the data that you’re uploading to our system, so you can check you’re happy with us using it'
        break
      default:
    }

    const title = (<h3 className={this.style.pageHeadline}>{titleText}</h3>)
    const subtitle = (<p className={this.style.copy}>{subtitleText}</p>)
    return {title, subtitle}
  }

  renderTooltip () {
    const tooltip = get(this.props, 'tooltip')
    return !tooltip ? <span /> : (<Tooltip {...tooltip} />)
  }

  render () {
    if (this.state.leaving) {
      return (<Redirect to='/' push />)
    }

    const step = this.renderCurrentStep()
    const {title, subtitle} = this.renderCurrentTitles()

    return (<LayoutApp {...this.props} className={this.style.pageBody}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={this.props.csrfToken} />
      <PageHeader
        title='Unlocking your network'
        subtitle='On-boarding'
      />
      {title}
      {subtitle}
      <div className={this.style.pageContent}>
        {step}
        <div className={this.style.pageSidebar}>
          {this.renderTooltip()}
        </div>
      </div>
    </LayoutApp>)
  }
}

module.exports = ImportContactsPage
