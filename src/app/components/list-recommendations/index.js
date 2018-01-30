const React = require('react')
const get = require('lodash/get')
const { css } = require('@nudj/components/lib/css')

const getPersonOrConnectionName = require('../../lib/get-person-or-connection-names')
const Item = require('../recommendation')
const style = require('./style.css')

const ListRecommendations = ({ recommendations, getHref }) => (
  <ol className={css(style.list)}>
    {recommendations.map(recommendation => {
      const person = get(recommendation, 'person')
      const { firstName, lastName } = getPersonOrConnectionName(person)

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
