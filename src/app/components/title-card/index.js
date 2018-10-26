const React = require('react')
const { css, mergeStyleSheets } = require('@nudj/components/styles')
const { Card, Text, Align } = require('@nudj/components')

const ActionableListContents = require('../actionable-list-contents')
const style = require('./style.css')

const TitleCard = ({
  children,
  title,
  titleRight,
  styleSheet = {},
  actions,
  ...props
}) => {
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
      {actions && (
        <ActionableListContents
          styleSheet={{
            root: style.actionList,
            actions: style.actionListActions
          }}
        >
          {actions}
        </ActionableListContents>
      )}
    </Card>
  )
}

module.exports = TitleCard
