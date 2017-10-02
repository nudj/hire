let { css, merge, mixins, variables } = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
}

const optionText = merge(mixins.headings.p, {
  color: variables.colors.charcoal
})

const styles = {
  pageContent: {
    padding: `0 0 ${variables.padding.d} 0`
  },
  companyLink: mixins.deLink,
  activeContainer: merge(nextToTitleContainer),
  activeContainerCentered: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeContainerTitle: merge(optionText, {
    padding: `0 0 ${variables.padding.d} 0`
  }),
  highlight: mixins.highlightColour,
  copy: merge(mixins.typography.p, {
    marginLeft: variables.padding.d,
    width: '75%'
  }),
  surveyFrame: merge(mixins.cardStyle, {
    padding: `${variables.padding.f}`,
    border: '0',
    height: '100%',
    minHeight: '70vh',
    outline: '0',
    width: '100%'
  })
}

module.exports = css(merge(mixins.pageLayout, styles))
