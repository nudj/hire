const { StyleSheet } = require('@nudj/components/lib/css')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left',
    borderCollapse: 'collapse'
  },
  row: {
    cursor: 'pointer'
  },
  cell: {
    whiteSpace: 'no-wrap'
  }
})

module.exports = styleSheet
