const { StyleSheet, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  dropzone: {
    textAlign: 'center',
    padding: sizes.largeIi,
    position: 'relative',
    overflow: 'hidden',
    minHeight: '18.625rem'
  },
  containerReject: {},
  messageReject: {
    color: colors.danger
  },
  connectionsCount: {
    color: colors.success
  },
  loaderContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  copy: {
    position: 'absolute',
    bottom: sizes.largeIii,
    left: 0,
    width: '100%',
    textAlign: 'center'
  },
  copyTop: {
    position: 'absolute',
    top: sizes.largeIii,
    left: 0,
    width: '100%',
    textAlign: 'center'
  },
  pointIllustration: {
    backgroundImage: 'url(/assets/images/point-hand-1.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '35rem',
    content: '""',
    display: 'block',
    height: '100%',
    left: 'calc(50% - 3rem)',
    margin: '0',
    position: 'absolute',
    top: '-60%',
    width: '100%',
    transform: 'rotate(-70deg)'
  },
  thumbsDownIllustration: {
    backgroundImage: 'url(/assets/images/thumbs-up-hand-1.svg)',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30rem',
    content: '""',
    display: 'block',
    height: '75%',
    right: 'auto',
    left: 'calc(50% - 2rem)',
    margin: '0',
    position: 'absolute',
    top: '0',
    width: 'calc(50% + 3rem)',
    transform: 'rotate(-180deg)'
  },
  thumbsUpIllustration: {
    backgroundImage: 'url(/assets/images/thumbs-up-hand-1.svg)',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30rem',
    content: '""',
    display: 'block',
    height: '65%',
    left: 'auto',
    right: 'calc(50% - 3rem)',
    margin: '0',
    position: 'absolute',
    top: '0',
    width: 'calc(50% + 3rem)'
  },
  okHandIllustration: {
    backgroundImage: 'url(/assets/images/ok-hand.svg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '10rem',
    content: '""',
    display: 'block',
    height: '100%',
    left: 'auto',
    right: 'calc(50% - 3rem)',
    margin: '0',
    position: 'absolute',
    top: '30%',
    width: 'calc(50% - 3rem)'
  }
})

module.exports = styleSheet
