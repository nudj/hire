const React = require('react')
const { css } = require('@nudj/components/lib/css')

const Item = require('./recommendation-item')
const style = require('./style.css')

const ListRecommendations = ({ recommendations }) => (
  <ol className={css(style.list)}>
    {recommendations.map(recommendation => (
      <li key={recommendation.id} className={css(style.listItem)}>
        <Item
          id={recommendation.id}
          firstName={recommendation.firstName}
          lastName={recommendation.lastName}
          role={recommendation.role}
          company={recommendation.company}
        />
      </li>
    ))}
  </ol>
)

module.exports = ListRecommendations
