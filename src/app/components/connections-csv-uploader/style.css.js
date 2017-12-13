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
  pointIllustration: {
    width: '20.625rem',
    position: 'absolute',
    top: 0,
    right: '50%',
    transform: 'rotate(-70deg) translate(26%, 500%)',
    transition: 'transform 150ms ease-in-out'
  },
  pointActive: {
    transform: 'rotate(-70deg) translate(24%, 500%)'
  },
  thumbsUpIllustration: {
    backgroundImage: 'url(/assets/images/thumbs-up-hand-1.svg)',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    content: '""',
    display: 'block',
    height: '70%',
    left: 'auto',
    right: 'calc(50% - 3rem)',
    margin: '0',
    position: 'absolute',
    top: '0',
    width: 'calc(50% + 3rem)'
  },
  browseLink: {
    marginTop: sizes.largeIi
  }
})

module.exports = styleSheet
