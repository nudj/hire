let {
  css,
  merge
} = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

module.exports = css({
  row: merge(listStyle, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '4px',
    marginTop: '10px',
    padding: '20px',
    boxShadow: '0 0.5px 0.5px 0 rgba(0, 0, 0, 0.1)',
    minHeight: '80px',
    ':first-child': {
      margin: 0
    }
  }),
  title: {
    flex: 1
  },
  details: {
    flex: 2,
    listStyle: 'none',
    display: 'flex'
  },
  detail: {
    listStyle: 'none',
    flex: 1,
    position: 'relative',
    paddingLeft: '40px',
    ':before': {
      content: '""',
      borderLeft: '1px solid gray',
      height: '20px',
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    ':first-child': {
      paddingLeft: 0,
      ':before': {
        display: 'none'
      }
    }
  },
  definition: {
    margin: 0
  },
  definitionTerm: {
    display: 'block'
  },
  definitionDescription: {
    display: 'block',
    margin: 0,
    wordBreak: 'break-word'
  },
  actions: merge({
    flex: 0,
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }, listStyle),
  action: listStyle
})
