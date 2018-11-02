const requestGQL = require('./requestGql')
const mapValues = require('lodash/mapValues')

const { createEnumMap } = require('../lib')

const fetchEnums = async typeMap => {
  const args = []
  const variables = {}
  const queries = []
  Object.values(typeMap).forEach(type => {
    args.push(`$${type}: String!`)
    variables[type] = type
    queries.push(`
      ${type}: __type(name: $${type}) {
        values: enumValues {
          name
        }
      }
    `)
  })

  const data = await requestGQL(null, `
    query fetchEnum (${args.join('\n')}) {
      ${queries.join('')}
    }
  `, variables)

  return mapValues(typeMap, type => data[type] && createEnumMap(data[type].values))
}

module.exports = fetchEnums
