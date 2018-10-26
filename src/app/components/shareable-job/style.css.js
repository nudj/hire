const {
  StyleSheet,
  colors,
  sizes,
  typography,
  animations
} = require('@nudj/components/styles')

const translateY = val => `translate3d(0, ${val}%, 0)`
const scale = val => `scale(${val})`

const springIn = animations.getKeyframes('transform', 100, 0, translateY)
const springOut = animations.getKeyframes('transform', 0, 100, translateY)
const scaleUp = animations.getKeyframes('transform', 0, 1, scale)
const scaleUpDelays = animations.getStaggeredAnimationDelay(7, 50, 50)

const action = {
  ...typography.type.regular,
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  paddingTop: sizes.smallI,
  paddingBottom: sizes.smallI,
  color: colors.greyDark,
  textDecoration: 'none',
  flex: 1,
  ':hover': {
    color: colors.grey,
    boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
  },
  ':focus': {
    color: colors.grey
  },
  ':nth-child(1) ~ *': {
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    ':hover': {
      borderTopColor: colors.greyLight,
      borderTopWidth: '1px',
      borderTopStyle: 'solid'
    },
    '@media(min-width: 36.5rem)': {
      borderTopWidth: '0',
      borderLeftColor: colors.greyLight,
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      ':hover': {
        borderTopWidth: '0',
        borderLeftColor: colors.greyLight,
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid'
      }
    }
  }
}

const styleSheet = StyleSheet.create({
  root: {
    position: 'relative',
    paddingBottom: 0
  },
  body: {
    opacity: 1,
    transition: 'opacity 400ms',
    minHeight: '6.875rem'
  },
  fadeOut: {
    opacity: 0
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    borderTopColor: colors.greyLight,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    marginLeft: `-${sizes.regular}`,
    marginRight: `-${sizes.regular}`,
    marginTop: sizes.regular,
    '@media(min-width: 36.5rem)': {
      flexDirection: 'row'
    }
  },
  action: {
    ...action
  },
  actionPrimary: {
    ...action,
    color: colors.primary,
    ':hover': {
      color: colors.primaryLight,
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    },
    ':focus': {
      color: colors.primaryLight
    }
  },
  actionPrimaryDisabled: {
    ...action,
    color: colors.primary,
    opacity: 0.5,
    cursor: 'default',
    ':hover': {
      color: colors.primary
    }
  },
  sharePanel: {
    position: 'absolute',
    boxShadow: 'none',
    paddingTop: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: sizes.regular,
    paddingLeft: sizes.regular,
    width: '100%',
    // hack to prevent underlying interface from showing during the "in" animation
    height: `calc(100% + ${sizes.largeIi})`,
    top: 0,
    left: 0,
    animationDuration: '500ms',
    animationIterationCount: '1',
    animationFillMode: 'forwards',
    transform: 'translate3d(0, 100%, 0)'
  },
  sharePanelActive: {
    transform: 'translate3d(0, 0%, 0)',
    animationName: [springIn]
  },
  sharePanelInactive: {
    animationName: [springOut]
  },
  closeButton: {
    position: 'absolute',
    top: sizes.smallIi,
    right: sizes.smallIi,
    left: 'auto'
  },
  linkContainer: {
    display: 'flex',
    marginTop: sizes.regular
  },
  copyButton: {
    flexGrow: 0,
    transition: 'none'
  },
  shareButton: {
    marginTop: sizes.regular,
    marginRight: sizes.smallIi,
    animationDuration: '200ms',
    animationIterationCount: '1',
    animationFillMode: 'forwards',
    transform: 'scale(1)'
  },
  shareButtonActive: {
    transform: 'scale(0)',
    animationName: [scaleUp],
    ...scaleUpDelays
  }
})

const inputStyleSheet = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexBasis: '100%',
    maxWidth: '20rem'
  }
})

module.exports = {
  styleSheet,
  inputStyleSheet
}
