const React = require('react')

const { Align, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const { renderSimpleTemplate } = require('@nudj/library')

const style = require('./style.css')

const dumblyRenderBody = body => body.split('\n').map(paragraph => {
  if (paragraph.length === 0) return <br />

  return <p>{paragraph}</p>
})

const Email = ({ from, date, body }) => {
  return (
    <div className={css(style.root)}>
      <Align
        leftChildren={<Text size='smallI' style={style.metaDataItem}>{from}</Text>}
        rightChildren={<Text size='smallI' style={style.metaDataItem}>{date}</Text>}
      />
      <div className={css(style.body)}>
        <Text element="div">
          { dumblyRenderBody(body) }
        </Text>
      </div>
    </div>
  )
}

module.exports = Email