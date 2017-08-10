const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Redirect } = require('react-router')
const Dropzone = require('react-dropzone')

const Papa = require('papaparse')

const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')

const getStyle = require('./import-contacts-linkedin-page.css')

// const { postData } = require('../../actions/app')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const active = 1
    const data = []
    const leaving = false
    this.state = {active, data, leaving}
  }

  onClickStep (active) {
    return (event) => {
      this.setState({ active })
    }
  }

  convertLinkedInToNudjPeople (linkedInData) {
    const nudjData = linkedInData.map(this.convertLinkedInToNudjPerson).filter(person => person.email)
    nudjData.sort((a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : 0)
    return nudjData
  }

  convertLinkedInToNudjPerson (person) {
    return {
      email: get(person, 'EmailAddress', ''),
      firstName: get(person, 'FirstName', ''),
      lastName: get(person, 'LastName', ''),
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
        this.setState({data})
      }
    })
  }

  uploadContacts (event) {

  }

  cancelUpload (event) {
    const leaving = window.confirm('Do you really want to cancel this?')
    this.setState({leaving})
  }

  stepInfo () {
    return (<div className={this.style.instructionsStepContainer}>
      <h4 className={this.style.instructionsStepHeading}>Step 1 - Requesting your data</h4>
      <ol className={this.style.instructionsSteps}>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Log in to <a className={this.style.instructionsCopyLink} href='https://www.linkedin.com/' target='_blank'>LinkedIn</a>.</p>
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Click on your profile image (labeled "Me") in the top right hand corner of the page.</p>
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Next, click on <a className={this.style.instructionsCopyLink} href='https://www.linkedin.com/psettings/' target='_blank'>"Settings &amp; Privacy"</a>.</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-01.png' alt='Your LinkedIn home page' />
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Scroll, down until <em className={this.style.instructionsCopyEmphasis}>"Getting an archive of your data"</em> and click on <a className={this.style.instructionsCopyLink} href='https://www.linkedin.com/psettings/member-data' target='_blank'>Change</a>.</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-02.png' alt='The LinkedIn Settings &amp; Privacy page' />
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Make sure <em className={this.style.instructionsCopyEmphasis}>"Fast file only"</em> is selected, then click on <em className={this.style.instructionsCopyEmphasis}>"Request archive"</em>.</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-03.png' alt='The LinkedIn Settings &amp; Privacy page with the "Getting an archive of your data" section open' />
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Enter your password and hit <em className={this.style.instructionsCopyEmphasis}>"Done"</em> - you should now see a green tick with Save next to it.</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-04.png' alt='The LinkedIn Settings &amp; Privacy page with the "Getting an archive of your data" section open and a green "Done" tick displayed' />
        </li>
      </ol>
      <h4 className={this.style.instructionsStepHeading}>Step 2 - Downloading your data</h4>
      <ol className={this.style.instructionsSteps}>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Log into your email account that you use to log into your LinkedIn account, you should have received an email from LinkedIn with a link to download your data.</p>
          <p className={this.style.instructionsCopy}>If it's not there, give it 10 minutes and check again (it may also end up in your spam / junk folder, so it's worth also checking in there if it doesn't appear immediately).</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-05.png' alt='An email from LinkedIn with instructions on how to download your data' />
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Open the email and click the link to download your data - this will take you back to LinkedIn Settings page.</p>
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Click on the Download button and save it where ever you like.</p>
          <img className={this.style.instructionsImage} src='/assets/images/upload-contacts/linkedin-step-06.png' alt='The LinkedIn Settings &amp; Privacy page with a link to download your data' />
        </li>
      </ol>
      <h4 className={this.style.instructionsStepHeading}>Step 3 - Preparing your data for upload</h4>
      <ol className={this.style.instructionsSteps}>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Go to where you saved the downloaded folder, open it up and locate on the <em className={this.style.instructionsCopyEmphasis}>Connections.csv</em> file. We only need this .csv  file, not the whole folder.</p>
          ...
        </li>
      </ol>
      <h4 className={this.style.instructionsStepHeading}>Step 4 - Uploading to nudj</h4>
      <ol className={this.style.instructionsSteps}>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Click next?</p>
        </li>
        <li className={this.style.instructionsStep}>
          <p className={this.style.instructionsCopy}>Click the box, locate the .csv file and select it (alternatively you can drag and drop the renamed .csv  file into the box).</p>
        </li>
      </ol>
    </div>)
  }

  stepPreview () {
    const data = get(this.state, 'data', [])

    return (<div>
      <p className={this.style.instructionsCopy}>To be totally transparent, we wanted to show you the data that you’re uploading to our system, so you can check you’re happy with us using it</p>
      <p className={this.style.instructionsCopy}>Contacts ({data.length})</p>
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
      <h5 className={this.style.dragAndDropHeading}>Drag &amp; drop</h5>
      <p className={this.style.dragAndDropCopy}>Or click to select from computer</p>
    </span>)
  }

  stepUpload () {
    const disablePreview = true
    const multiple = false
    return (<div className={this.style.instructionsStepContainer}>
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
    </div>)
  }

  renderCurrentStep () {
    const active = this.state.active

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
        back = (<button onClick={this.onClickStep(active - 1)} className={this.style.cancelButton}>Back</button>)
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

  renderCurrentTitle () {
    const active = this.state.active
    let titleText = 'How to export your LinkedIn contacts'

    switch (active) {
      case 2:
        titleText = 'Upload your contacts'
        break
      case 3:
        titleText = 'Check your data'
        break
      default:
    }

    return <h3 className={this.style.pageHeadline}>{titleText}</h3>
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
    const title = this.renderCurrentTitle()

    return (<div className={this.style.pageBody}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={this.props.csrfToken} />
      <PageHeader
        title='Upload your contacts'
        subtitle='LinkedIn'
      />
      {title}
      <div className={this.style.pageContent}>
        {step}
        <div className={this.style.pageSidebar}>
          {this.renderTooltip()}
        </div>
      </div>
    </div>)
  }
}
