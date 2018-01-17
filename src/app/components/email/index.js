const React = require('react')

const { Align, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')
const { renderSimpleTemplate } = require('@nudj/library')

const style = require('./style.css')

const Email = ({ from, date, body }) => {
  const lol = renderSimpleTemplate({
    template: body,
    pify: (paragraph, length, padding) => {
      return <p>{paragraph}</p>
    }
  })
  console.log(lol)

  return (
    <div className={css(style.root)}>
      <Align
        leftChildren={<Text size='smallI' style={style.metaDataItem}>{from}</Text>}
        rightChildren={<Text size='smallI' style={style.metaDataItem}>{date}</Text>}
      />
      <div className={css(style.body)}>
        <Text>
          { lol }
        </Text>
      </div>
    </div>
  )
}

module.exports = Email
