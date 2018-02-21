const React = require('react')
const get = require('lodash/get')
const { css } = require('@nudj/components/lib/css')

const Item = require('../recommendation')
const style = require('./style.css')

const ListRecommendations = ({ recommendations, getHref }) => (
  <ol className={css(style.list)}>
    {recommendations.map(recommendation => {
      const person = get(recommendation, 'person')
      const firstName = person.firstName || recommendation.firstName
      const lastName = person.lastName || recommendation.lastName

      return (
        <li key={recommendation.id} className={css(style.listItem)}>
          <Item
            id={recommendation.id}
            firstName={firstName}
            lastName={lastName}
            role={recommendation.role}
            company={recommendation.company}
            href={getHref(recommendation.person)}
          />
        </li>
      )
    })}
  </ol>
)

module.exports = ListRecommendations
