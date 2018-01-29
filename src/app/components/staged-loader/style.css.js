const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const ellipsisMovement = {
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
  message: {
    marginTop: sizes.largeIii,
    position: 'relative'
  },
  ellipsis: {
    marginLeft: '1px',
    position: 'relative',
    top: '2px'
  },
  ellipsisDot: {
    width: sizes.smallIi,
    height: sizes.smallIi,
    backgroundColor: 'currentColor',
    borderRadius: '100%',
    display: 'inline-block',
    animationName: ellipsisMovement,
    animationDuration: '2.0s',
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
