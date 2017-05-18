let {
  css,
  merge,
  mixins
} = require('../../lib/css')

const tag = {
  background: 'lightgreen',
  border: '1px solid green',
  borderRadius: '1rem',
  padding: '2px 8px'
}

module.exports = css(merge(mixins.pageLayout, {
  tagOk: tag,
  tagError: merge(tag, {
    background: 'pink',
    borderColor: 'red'
  }),
  message: {
    width: '100%',
    height: '20rem'
  },
  subject: {
    width: '100%',
    display: 'block'
  }
}))
