const React = require('react')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { Card, Text, Align } = require('@nudj/components')

const style = require('./style.css')

const TitleCard = ({ children, title, titleRight, styleSheet = {}, ...props }) => {
  const styles = mergeStyleSheets(style, styleSheet)

  return (
    <Card
      {...props}
      style={styles.card}
    >
      <Text element='div' style={styles.title}>
        <Align
          styleSheet={{
            root: style.buttonList
          }}
          leftChildren={title}
          rightChildren={titleRight}
        />
      </Text>
      <div className={css(styles.body)}>
        {children}
      </div>
    </Card>
  )
}

module.exports = TitleCard
