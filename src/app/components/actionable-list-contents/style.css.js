const {
  StyleSheet,
  colors,
  sizes,
  typography
} = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
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
    ...typography.type.regular,
    display: 'block',
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    fontSize: '1em',
    verticalAlign: 'top',
    cursor: 'pointer',
    width: 'auto',
    background: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    ':active': {
      background: 'transparent',
      borderColor: 'transparent',
      color: 'currentColor'
    },
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    paddingTop: sizes.smallI,
    paddingBottom: sizes.smallI,
    color: colors.greyDark,
    textDecoration: 'none',
    flex: 1,
    ':hover': {
      color: colors.grey,
      boxShadow: 'inset 0 1px 7px -4px rgba(0, 0, 0, 0.3)',
      background: 'transparent',
      borderColor: 'transparent'
    },
    ':focus': {
      color: colors.grey,
      background: 'transparent',
      borderColor: 'transparent'
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
  },
  root: {
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: sizes.regular,
    paddingLeft: sizes.regular,
    paddingRight: sizes.regular,
    paddingBottom: 0
  },
  editLink: {
    color: colors.primary,
    textDecoration: 'none',
    display: 'block',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    fontWeight: typography.fontWeight.bold,
    ':hover': {
      opacity: '0.8'
    }
  },
  editIcon: {
    marginRight: sizes.smallIii,
    verticalAlign: 'middle'
  },
  titleContainer: {
    display: 'flex'
  },
  title: {
    color: colors.primary,
    flexBasis: '100%',
    lineHeight: 1
  },
  location: {
    display: 'inline-block',
    fontWeight: typography.fontWeight.bold,
    color: colors.midRed,
    marginRight: sizes.regular,
    marginTop: sizes.smallIii
  },
  statisticsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: sizes.regular,
    marginBottom: 0,
    marginLeft: `-${sizes.smallIi}`,
    marginRight: `-${sizes.smallIi}`,
    textAlign: 'left'
  },
  statisticItem: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    paddingLeft: sizes.smallIi,
    paddingRight: sizes.smallIi,
    ':nth-child(1) ~ *': {
      marginTop: sizes.smallIi
    },
    '@media(min-width: 28rem)': {
      flexBasis: '50%',
      ':nth-child(1) ~ *': {
        marginTop: 0
      },
      ':nth-child(2) ~ *': {
        marginTop: sizes.smallIi
      }
    },
    '@media(min-width: 40.75rem)': {
      flexBasis: 'auto',
      ':nth-child(1) ~ *': {
        marginTop: 0
      },
      ':nth-child(2) ~ *': {
        marginTop: 0
      }
    }
  },
  statisticLabel: {
    order: 1,
    color: colors.text,
    marginLeft: 0
  },
  statisticValue: {
    order: 2,
    color: colors.text,
    fontWeight: typography.fontWeight.bold,
    marginTop: sizes.smallIii
  },
  tagContainer: {
    marginTop: sizes.regular
  },
  tagGroup: {
    paddingTop: sizes.smallIii
  }
})

module.exports = styleSheet
