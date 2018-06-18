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
          inputValue,
          presetValue
        }
      }
    } = this.props

    if (!presetValue && !inputValue) {
      return dispatch(appActions.showNotification({
        message: 'Please enter a bonus',
        type: 'error'
      }))
    }

    const bonus = currencyValue === currencyKeys.CUSTOM
      ? inputValue
      : `${currencies[currencyValue].symbol}${presetValue || inputValue}`

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
              Set the job&apos;s referral bonus
            </Heading>
            <Para nonsensitive>
              Choose what you want to reward the referrer with.
            </Para>
          </Section>
          <Section padding width='regular'>
            <form onSubmit={this.handleSubmit} method='POST'>
              <JobBonusSelection
                currencyValue={state.fieldValues.currencyValue}
                presetValue={state.fieldValues.presetValue}
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
                Set bonus and publish job
              </Button>
            </form>
          </Section>
        </Main>
      </Layout>
    )
  }
}

module.exports = SetBonusPage
