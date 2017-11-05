const _omit = require('lodash/omit')
const {
  merge,
  promiseMap,
  actionMapAssign
} = require('@nudj/library')
const {
  Redirect,
  NotFound
} = require('@nudj/framework/errors')
const request = require('../../lib/request')

const get = async ({
  data,
  params
}) => {
  const query = `
    query PageData ($userEmail: String) {
      person: personByFilters (filters: {
        email: $userEmail
      }) {
        hirer {
          ...Global
          ...Page
        }
      }
    }
    fragment Global on Hirer {
      person {
        incompleteTaskCount
      }
      company {
        onboarded
      }
    }
    fragment Page on Hirer {
      company {
        survey: surveyByFilters (filters: {
          slug: "aided-recall-baby"
        }) {
          id
          slug
          sections: surveySections {
            id
            title
            description
            questions: surveyQuestions {
              id
              title
              description
              name
              type
              required
              dependencies
              options
              tags
            }
          }
        }
      }
    }
  `
  const variables = {
    userEmail: data.user.email
  }
  const responseData = await request('/', {
    baseURL: `http://${process.env.API_HOST}:82`,
    method: 'post',
    data: {
      query,
      variables
    }
  })
  return merge(data, responseData.data.person.hirer)


  return actionMapAssign(
    data,
    {
      survey: () => request(`surveys?slug=${params.surveySlug}`).then(surveys => surveys[0] || Promise.reject(new NotFound(`Survey with slug ${params.surveySlug} not found`)))
    }
  )
}

const post = ({
  data,
  params,
  body
}) => {
  return actionMapAssign(
    data,
    {
      survey: () => request(`surveys?slug=${params.surveySlug}`).then(surveys => surveys[0] || Promise.reject(new NotFound(`Survey with slug ${params.surveySlug} not found`)))
    },
    {
      people: data => Promise.all(body.connections.map(connection => {
        return request('people', {
          params: {
            email: connection.email
          }
        })
        .then(people => people[0])
        .then(person => {
          if (person) return person
          return request('people', {
            method: 'post',
            data: _omit(connection, ['tags'])
          })
        })
      }))
    },
    {
      connections: data => Promise.all(data.people.map(person => {
        return request('connections', {
          params: {
            from: data.person.id,
            to: person.id
          }
        })
        .then(connections => connections[0])
        .then(connection => {
          if (connection) return connection
          return request('connections', {
            method: 'post',
            data: {
              from: data.person.id,
              to: person.id,
              source: body.source
            }
          })
        })
      }))
    }
  )
}

module.exports = {
  get,
  post
}
