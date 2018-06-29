const React = require('react')

const {
  Icon,
  IconInput,
  IntegerInput,
  Input,
  RadioBlockGroup
} = require('@nudj/components')
const CardStyleSheet = require('@nudj/components/lib/components/card/style.css')
const { css } = require('@nudj/components/lib/css')

const { currencies, currencyKeys } = require('../../lib/constants')
const style = require('./style.css')

const currenciesArr = Object.keys(currencies)
const presetBonusAmounts = ['500', '1000', '1500']

const currencyRadioGroupStyles = [CardStyleSheet.root, style.cardInput]
const presetValueRadioGroupStyles = [CardStyleSheet.root, style.cardInput, style.presetInput]
const inputStyles = {
  root: [CardStyleSheet.root, style.cardInput, style.valueInput],
  input: style.input
}
const currencyRadioButtonStyleSheet = {
  wrapper: style.currencyRadioWrapper
}

const presetRadioButtonStyleSheet = {
  wrapper: style.presetRadioWrapper
}

const CurrencyBlock = ({ symbol, label, onClick }) => (
  <span onClick={onClick} className={css(style.currencyBlock)}>
    <span className={css(style.currencyIcon)}>
      {symbol}
    </span>
    <span className={css(style.currencyLabel)}>
      {label}
    </span>
  </span>
)

class JobBonusSelection extends React.Component {
  componentDidUpdate () {
    const { currencyValue } = this.props
    if (currencyValue === currencyKeys.CUSTOM) {
      this.customBonusInput.focus()
    }
  }

  handleCurrencyChange = ({ value }) => {
    const { inputValue, onCurrencyChange } = this.props

    onCurrencyChange({
      currencyValue: value,
      inputValue: value === currencyKeys.CUSTOM ? '' : inputValue
    })
  }

  handleInputChange = ({ value }) => {
    const { onInputChange } = this.props

    onInputChange({
      inputValue: value
    })
  }

  render () {
    const {
      currencyValue,
      inputValue
    } = this.props

    const selectedCurrency = currencies[currencyValue] || {}

    return (
      <div>
        <RadioBlockGroup
          name='currency'
          value={currencyValue}
          onChange={this.handleCurrencyChange}
          styles={currencyRadioGroupStyles}
          radioButtonStyleSheet={currencyRadioButtonStyleSheet}
        >
          {block => currenciesArr.map(currency => block({
            key: currency,
            id: currency,
            value: currency,
            label: (
              <CurrencyBlock
                symbol={<Icon name={currencies[currency].icon} />}
                label={currency}
              />
            )
          }))}
        </RadioBlockGroup>
        {currencyValue !== currencyKeys.CUSTOM && (
          <RadioBlockGroup
            name='value'
            value={inputValue}
            styles={presetValueRadioGroupStyles}
            onChange={this.handleInputChange}
            radioButtonStyleSheet={presetRadioButtonStyleSheet}
          >
            {block => presetBonusAmounts.map(amount => block({
              key: amount,
              id: amount,
              label: `${selectedCurrency.symbol}${amount}`,
              value: amount
            }))}
          </RadioBlockGroup>
        ) }
        {currencyValue !== currencyKeys.CUSTOM ? (
          <IntegerInput
            Component={IconInput}
            iconName={selectedCurrency.icon}
            styleSheet={inputStyles}
            placeholder='Other amount'
            value={inputValue}
            onChange={this.handleInputChange}
          />
        ) : (
          <Input
            styleSheet={inputStyles}
            placeholder='Custom bonus'
            ref={input => { this.customBonusInput = input }}
            value={inputValue}
            onChange={this.handleInputChange}
          />
        )}
      </div>
    )
  }
}

module.exports = JobBonusSelection
