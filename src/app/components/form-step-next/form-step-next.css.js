let {
  css,
  merge,
  variables,
  mixins
} = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
}

const optionText = merge(mixins.headings.p, {
  color: variables.colors.charcoal
})

const styles = {
  activeContainerCentered: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeContainerTitle: merge(optionText, {
    padding: `0 0 ${variables.padding.d} 0`
  }),
  nextStepNudj: merge(mixins.button, {
    display: 'inline-block'
  }),
  nextStepDashboard: merge(mixins.buttonSecondary, {
    display: 'inline-block',
    margin: `0 ${variables.padding.d} 0 0`
  })
}

module.exports = css(styles)
