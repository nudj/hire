const React = require('react')

const { Align, Text } = require('@nudj/components')
const { css } = require('@nudj/components/lib/css')

const style = require('./style.css')

const Email = ({ to, date, body }) => (
  <div className={css(style.root)}>
    <Align
      leftChildren={<Text size="smallI" style={style.metaDataItem}>{to}</Text>}
      rightChildren={<Text size="smallI" style={style.metaDataItem}>{date}</Text>}
    />
    <div className={css(style.body)}>
      <Text>
        {body}
      </Text>
    </div>
  </div>
)

module.exports = Email
