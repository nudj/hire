const React = require('react')
const { Helmet } = require('react-helmet')
const get = require('lodash/get')
const { Link } = require('react-router-dom')

const Papa = require('papaparse')

const PageHeader = require('../page-header/page-header')
const Tooltip = require('../tooltip/tooltip')
const { merge } = require('../../../lib')

const getStyle = require('./import-contacts-linkedin-page.css')

const { postData } = require('../../actions/app')

module.exports = class ComposePage extends React.Component {
  constructor (props) {
    super(props)
    this.style = getStyle()

    const active = 1
    const data = []
    this.state = {active, data}
  }

  onClickStep (active) {
    return (event) => {
      this.setState({ active })
    }
  }

  convertlinkedInToNudjPerson (person) {
    return {
      email: get(person, 'EmailAddress', ''),
      firstName: get(person, 'FirstName', ''),
      lastName: get(person, 'LastName', ''),
      title: get(person, 'Title'),
      company: get(person, 'Companies')
    }
  }

  onUploadFile (event) {
    const file = event.target.files[0]
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const linkedInData = get(results, 'data', [])
        const data = linkedInData.map(this.convertlinkedInToNudjPerson).filter(person => person.email)
        this.setState({data})
      }
    })
  }

  stepInfo () {
    return (<div>
      <ol>
        <li>Log in to LinkedIn</li>
        <li>Click on your profile image (labelled “Me”) in the top-right hand corner</li>
        <li>Next, click on “Settings &amp; Privacy”</li>
        <li>Scroll down until “Getting an archive of your data” and click on Cha</li>
        <li>Make sure “Fast file only” is selected, then click on “Request archive”</li>
        <li>Enter your password and hit “Done” - you should now see a green ti</li>
      </ol>
    </div>)
  }

  stepPreview () {
    const data = get(this.state, 'data', [])

    return (<div>
      <p>To be totally transparent, we wanted to show you the data that you’re uploading to our system, so you can check you’re happy with us using it</p>
      <p>Contacts ({data.length})</p>
      <table>
        <thead>
          <tr>
            <th />
            <th>Email</th>
            <th>Name</th>
            <th>Company</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => {
            return (<tr>
              <td>{index + 1}</td>
              <td>{get(person, 'email')}</td>
              <td>{`${get(person, 'firstName', '')} ${get(person, 'lastName', '')}`}</td>
              <td>{get(person, 'company', '-')}</td>
              <td>{get(person, 'title', '-')}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>)
  }

  stepUpload () {
    return (<form>
      <input type='file' onChange={this.onUploadFile.bind(this)} />
    </form>)
  }

  renderCurrentStep () {
    const active = this.state.active
    const maxSteps = 3
    const back = this.state.active > 1 ? (<button onClick={this.onClickStep(active - 1)} className={this.style.cancelButton}>Back</button>) : (<span />)
    const next = this.state.active < maxSteps ? (<button onClick={this.onClickStep(active + 1)} className={this.style.confirmButton}>Next</button>) : (<span />)

    let step

    switch (active) {
      case 2:
        step = this.stepUpload()
        break
      case 3:
        step = this.stepPreview()
        break
      default:
        step = this.stepInfo()
    }

    return (<div className={this.style.pageMain}>
      {step}
      <div className={this.style.buttonContainer}>
        {back}
        {next}
      </div>
    </div>)
  }

  renderTooltip () {
    const tooltip = get(this.props, 'tooltip')
    return !tooltip ? <span /> : (<Tooltip {...tooltip} />)
  }

  render () {
    const step = this.renderCurrentStep()

    return (<div className={this.style.pageBody}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <input type='hidden' name='_csrf' value={this.props.csrfToken} />
      <PageHeader
        title='Upload your contacts'
        subtitle='LinkedIn'
      />
      <h3 className={this.style.pageHeadline}>Upload stuff</h3>
      <div className={this.style.pageContent}>
        {step}
        <div className={this.style.pageSidebar}>
          {this.renderTooltip()}
        </div>
      </div>
    </div>)
  }
}
