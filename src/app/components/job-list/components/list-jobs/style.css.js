const { StyleSheet, colors, sizes, typography } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
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
  },
  list: {
    ':not(:first-of-type)': {
      marginTop: sizes.regular
    }
  },
  listTitle: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.bold,
    display: 'flex',
    alignItems: 'center',
    ':before': {
      content: '""',
      height: '1px',
      width: '100%',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginRight: sizes.regular
    },
    ':after': {
      content: '""',
      height: '1px',
      width: '100%',
      flexGrow: 1,
      display: 'block',
      backgroundColor: colors.greyLight,
      marginLeft: sizes.regular
    }
  },
  jobCard: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    ':nth-child(1) ~ *': {
      marginTop: sizes.regular
    }
  }
})

module.exports = styleSheet
