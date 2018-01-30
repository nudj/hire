const React = require('react')
const { css } = require('@nudj/components/lib/css')

const Item = require('../recommendation')
const style = require('./style.css')

const ListRecommendations = ({ recommendations, getHref }) => (
  <ol className={css(style.list)}>
    {recommendations.map(recommendation => (
      <li key={recommendation.id} className={css(style.listItem)}>
        <Item
          id={recommendation.id}
          person={recommendation.person}
          role={recommendation.role}
          company={recommendation.company}
          href={getHref(recommendation.person)}
        />
      </li>
    ))}
  </ol>
)

module.exports = ListRecommendations
