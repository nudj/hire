const { StyleSheet, typography, sizes, colors } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  actionPrimary: {
    ...typography.type.regular,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    paddingTop: sizes.smallI,
    paddingBottom: sizes.smallI,
    textDecoration: 'none',
    flex: 1,
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
    },
    color: colors.primary,
    ':hover': {
      color: colors.primaryLight,
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    },
    ':focus': {
      color: colors.primaryLight
    }
  },
  listHeading: {
    marginTop: sizes.regular,
    ':first-child': {
      marginTop: 0
    }
  },
  selectAllCheckboxWrapper: {
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: colors.greyLight,
    display: 'flex',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    marginRight: 'auto',
    ':hover': {
      cursor: 'pointer',
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)'
    }
  },
  selectAllCheckbox: {
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular
  }
})

module.exports = styleSheet
