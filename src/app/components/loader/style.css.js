const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const spin = {
  '0%': {
    transform: 'scale(0)'
  },
  '100%': {
    transform: 'scale(1.0)',
    opacity: 0
  }
}

const elipsisMovement = {
  '0%': {
    transform: 'scale(0)',
    opacity: 1
  },
  '40%': {
    transform: 'scale(0.5)'
  },
  '80%': {
    transform: 'scale(0)',
    opacity: 1
  },
  '100%': {
    transform: 'scale(0)',
    opacity: 0
  }
}

module.exports = StyleSheet.create({
  root: {
    backgroundColor: colors.greyLightest,
    minHeight: '100%'
  },
  body: {
    flex: '1 1 auto',
    display: 'flex',
    height: `calc(100vh - ${sizes.largeIi})`,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    width: sizes.largeIi,
    height: sizes.largeIi,
    backgroundColor: colors.primary,
    borderRadius: '100%',
    animationName: spin,
    animationDuration: '1.0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out'
  },
  message: {
    marginTop: sizes.largeIii,
    position: 'absolute'
  },
  elipsis: {
    marginLeft: '1px',
    position: 'relative',
    top: '2px'
  },
  elipsisDot: {
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: '#333',
    borderRadius: '100%',
    display: 'inline-block',
    animationName: elipsisMovement,
    animationDuration: '2.0s, 0s',
    animationFillMode: 'both',
    animationIterationCount: 'infinite'
  },
  dotOne: {
    animationDelay: '-0.32s'
  },
  dotTwo: {
    animationDelay: '-0.16s'
  }
})
