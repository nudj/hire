const React = require('react')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { Card, Text } = require('@nudj/components')

const style = require('./style.css')

const TitleCard = ({ children, title, styleSheet = {}, ...props }) => {
  const styles = mergeStyleSheets(style, styleSheet)

  return (
    <Card
      {...props}
      style={styles.card}
    >
      <Text element='div' style={styles.title}>
        {title}
      </Text>
      <div className={css(styles.body)}>
        {children}
      </div>
    </Card>
  )
}

module.exports = TitleCard
