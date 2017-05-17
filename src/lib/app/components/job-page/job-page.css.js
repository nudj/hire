let {
  css
} = require('../../lib/css')

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

module.exports = () => css({
  body: {
    flexGrow: 1,
    background: '#ececeb'
  },
  recommendations: listStyle,
  content: {
    flex: 1,
    padding: '10px 20px',
    display: 'flex'
  },
  main: {
    flex: 1
  },
  sidebar: {
    width: '420px',
    padding: '0 60px'
  }
})
