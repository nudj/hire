const { StyleSheet, sizes } = require('@nudj/components/lib/css')

const breakpoint = '56.25rem'

const styleSheet = StyleSheet.create({
  card: {
    overflow: 'hidden',
    maxWidth: '36rem',
    height: '100%',
    margin: '0 auto',
    [`@media(min-width: ${breakpoint})`]: {
      maxWidth: '56rem'
    }
  },
  list: {
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    [`@media(min-width: ${breakpoint})`]: {
      marginTop: `-${sizes.smallIi}`,
      marginBottom: `-${sizes.smallIi}`,
      alignItems: 'stretch'
    }
  },
  listItem: {
    marginTop: 0,
    ':nth-child(1) ~ *': {
      marginTop: sizes.regular
    },
    ':nth-child(1) *': {
      ':after': {
        backgroundImage: 'none',
        [`@media(min-width: ${breakpoint})`]: {
          width: '30rem',
          height: '6.5rem',
          left: '100%',
          backgroundPosition: 'left',
          backgroundImage: 'url(/assets/images/one-finger.svg)'
        }
      }
    },
    ':nth-child(2) *': {
      ':after': {
        backgroundImage: 'none',
        [`@media(min-width: ${breakpoint})`]: {
          width: '25rem',
          height: '6.5rem',
          right: 'calc(100% + 1.25rem)',
          backgroundPosition: 'right',
          backgroundImage: 'url(/assets/images/two-fingers.svg)'
        }
      }
    },
    ':nth-child(3) *': {
      ':after': {
        backgroundImage: 'none',
        [`@media(min-width: ${breakpoint})`]: {
          width: '17rem',
          height: '24rem',
          left: 'calc(100% - 8.75rem)',
          backgroundPosition: 'left',
          top: 'calc(50% - 6.25rem)',
          backgroundImage: 'url(/assets/images/three-fingers.svg)'
        }
      }
    }
  },
  listItemContainer: {
    maxWidth: '31rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    position: 'relative',
    ':after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 'calc(50% - 3rem)',
      backgroundRepeat: 'no-repeat'
    }
  }
})

module.exports = styleSheet
