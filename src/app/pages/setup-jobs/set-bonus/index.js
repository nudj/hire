const React = require('react')
const { Helmet } = require('react-helmet')
const { app: appActions } = require('@nudj/framework/actions')

const { Button } = require('@nudj/components')
const mss = require('@nudj/components/lib/css/modifiers.css')

const { currencies, currencyKeys } = require('../../../lib/constants')
const Layout = require('../../../components/app-layout')
const JobBonusSelection = require('../../../components/job-bonus-selection')
const Main = require('../../../components/main')
const Section = require('../../../components/section')
const {
  Heading,
  Para
} = require('../../../components/wizard')
const {
  setFieldValues,
  submitBonusAndPublishJob
} = require('./actions')

class SetBonusPage extends React.Component {
  handleChange = values => {
    const { dispatch } = this.props
    dispatch(setFieldValues(values))
  }

  handleSubmit = () => {
    const {
      dispatch,
      setBonusPage: {
        fieldValues: {
          currencyValue,
          inputValue
        }
      }
    } = this.props

    if (!inputValue) {
      return dispatch(appActions.showNotification({
        message: 'Please enter a bonus',
        type: 'error'
      }))
    }

    const bonus = currencyValue === currencyKeys.CUSTOM
      ? inputValue
      : `${currencies[currencyValue].symbol}${inputValue}`

    dispatch(submitBonusAndPublishJob(bonus))
  }

  render () {
    const { setBonusPage: state } = this.props

    return (
      <Layout {...this.props}>
        <Helmet>
          <title>Set bonus</title>
        </Helmet>
        <Main>
          <Section padding>
            <Heading nonsensitive>
              Set the referral bonus
            </Heading>
            <Para nonsensitive>
              Pick or customise what you&apos;d like to reward for a successful referral
            </Para>
          </Section>
          <Section padding width='regular'>
            <form onSubmit={this.handleSubmit} method='POST'>
              <JobBonusSelection
                currencyValue={state.fieldValues.currencyValue}
                inputValue={state.fieldValues.inputValue}
                onPresetChange={this.handleChange}
                onInputChange={this.handleChange}
                onCurrencyChange={this.handleChange}
              />
              <Button
                volume='cheer'
                style={mss.mtReg}
                type='submit'
              >
                Save
              </Button>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetBonusPage
