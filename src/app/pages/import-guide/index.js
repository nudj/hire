// @flow
const React = require('react')
const get = require('lodash/get')
const { Helmet } = require('react-helmet')

const { Card, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const ButtonLink = require('../../components/button-link')
const sharedStyle = require('../shared.css')
const style = require('./style.css')

const StepOne = require('./step-one')
const StepTwo = require('./step-two')

// TODO: Correct typing
type Props = {
  match: Object
}

const STEPS = {
  linkedin: [<StepOne />, <StepTwo />]
}

const getUrl = (index: number, stepsCount: number) => {
  if (index >= stepsCount + 1) {
    return '/setup-network/linkedin/upload'
  } else if (index <= 1) {
    return '/setup-network'
  }

  return `/setup-network/linkedin/${index}`
}

const ImportPage = ({ match }: Props) => {
  const network = match.params.network
  const branch = STEPS[network]

  // TODO: redirect?
  if (!branch) return <div>Not found</div>

  const currentStep = get(match.params, 'step', 1)
  const nextUrl = getUrl(currentStep + 1, STEPS[network].length)

  return (
    <div className={css(sharedStyle.root)}>
      <Helmet>
        <title>nudj - upload your LinkedIn contacts</title>
      </Helmet>
      <div className={css(sharedStyle.wrapper)}>
        <div className={css(sharedStyle.header)}>
          <Text element="div" size="largeIi" style={sharedStyle.heading}>
            Requesting data from your LinkedIn
          </Text>
        </div>
        <Card style={sharedStyle.cardBody}>{branch[currentStep - 1]}</Card>
        <div className={css(sharedStyle.body)}>
          <ButtonLink
            href={nextUrl}
            volume="cheer"
            style={sharedStyle.singleNext}
          >
            Next
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

module.exports = ImportPage
