const { StyleSheet } = require('@nudj/components/styles')

const styleSheet = StyleSheet.create({
  root: {
    textAlign: 'left',
    borderCollapse: 'collapse'
  },
  rowSelectable: {
    cursor: 'pointer'
  },
  cell: {
    whiteSpace: 'no-wrap'
  }
})

module.exports = styleSheet
