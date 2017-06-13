let {
  css,
  merge,
  variables,
  mixins
} = require('../../lib/css')

const nextToTitleContainer = {
  width: `calc(100% - ${variables.padding.a})`
}

const title = merge(mixins.headings.h7, {
  flexShrink: '0',
  color: variables.colors.royalBlue,
  width: variables.padding.a
})

const sectionNumberSize = variables.padding.d

const sectionNumber = merge(mixins.headings.h7, {
  backgroundColor: variables.colors.midGrey,
  borderRadius: '100%',
  color: variables.colors.white,
  display: 'inline-block',
  height: sectionNumberSize,
  lineHeight: sectionNumberSize,
  margin: `0 ${variables.padding.e} 0 0`,
  position: 'relative',
  textAlign: 'center',
  width: sectionNumberSize
})

const sectionNumberActive = merge(sectionNumber, {
  backgroundColor: variables.colors.royalBlue
})

const activeOptionIcon = {
  display: 'inline-block',
  padding: `0 0 ${variables.padding.e} 0`
}

const optionTitle = merge(mixins.headings.h7, {
  color: variables.colors.royalBlue,
  padding: `0 0 ${variables.padding.f} 0`
})

const optionText = merge(mixins.headings.p, {
  color: variables.colors.charcoal
})

const styles = {
  section: merge({
    alignItems: 'center',
    display: 'flex'
  }, mixins.cardStyleTwo),
  sectionActive: merge({
    alignItems: 'center',
    display: 'flex'
  }, mixins.cardStyle),
  sectionTitle: merge(title),
  sectionNumber: sectionNumber,
  sectionNumberActive: sectionNumberActive,
  sectionNumberComplete: merge(sectionNumberActive, {
    color: variables.colors.royalBlue,
    '::after': {
      backgroundImage: `url('/assets/images/ui-24px-outline-1_check.svg')`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '60%', // ABOMINATION
      content: `''`,
      display: 'block',
      height: '100%',
      left: '0',
      position: 'absolute',
      top: '0',
      width: '100%'
    }
  }),
  preActiveText: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  activeOptionsContainer: merge(nextToTitleContainer, mixins.deList, {
    display: 'flex'
  }),
  activeOption: merge(mixins.cardStyleTwo, {
    background: variables.colors.offWhite,
    flexBasis: '0',
    flexGrow: '1',
    margin: `0 0 0 ${variables.padding.e}`,
    padding: '0',
    textAlign: 'center',
    ':first-child': {
      margin: '0'
    }
  }),
  activeOptionAction: {
    color: 'inherit',
    cursor: 'pointer',
    display: 'block',
    padding: variables.padding.d,
    textDecoration: 'none'
  },
  activeOptionIcon: activeOptionIcon,
  activeOptionImage: {},
  activeOptionIconEmoji: merge({
    display: 'block'
  }, activeOptionIcon),
  activeOptionTitle: optionTitle,
  activeOptionText: optionText,
  completedSectionSummary: merge(nextToTitleContainer, {
    textAlign: 'center'
  }),
  completedSectionSummaryTitle: optionTitle,
  completedSectionSummaryText: optionText,
  completedSectionSummaryMessage: {
    textAlign: 'left'
  },
  completedSectionSummaryMessageParagraph: merge(mixins.typography.p, {
    ':last-child': {
      margin: '0'
    }
  })
}

module.exports = css(styles)
