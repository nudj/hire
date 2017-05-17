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
    background: '#ececeb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0,
    background: '#fff',
    padding: '10px 20px'
  },
  title: {

  },
  headline: {
    padding: '20px 20px 10px',
    margin: 0
  },
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
  },
  jobs: listStyle,
  tip: {
    background: '#fff',
    padding: '30px'
  },
  tipTitle: {
    color: '#002d72',
    marginTop: 0
  },
  tipParagraph: {
    margin: 0,
    marginTop: '1rem',
    ':first-child': {
      marginTop: 0
    }
  }
})
