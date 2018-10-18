const requestGQL = require('./requestGql')
const { createEnumMap } = require('../lib')

const fetchEnums = async enumName => {
  const response = await requestGQL(null, `
    query fetchEnum ($enumName: String!) {
      enumTypes: __type(name: $enumName) {
        values: enumValues {
          name
        }
      }
    }
  `, { enumName })

  return response.enumTypes && createEnumMap(response.enumTypes.values)
}

module.exports = fetchEnums
