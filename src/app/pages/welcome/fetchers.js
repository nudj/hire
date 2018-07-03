const { Global } = require('../../lib/graphql')
const { createEnumMap } = require('../../lib')

const get = () => {
  const gql = `
    query {
      user {
        hirer {
          type
        }
      }
      hirerTypeEnum: __type(name: "HirerType") {
        values: enumValues {
          name
        }
      }
      ${Global}
    }
  `
  const transformData = data => {
    const hirerTypes = createEnumMap(data.hirerTypeEnum.values)

    return {
      ...data,
      enums: { hirerTypes }
    }
  }

  return { gql, transformData }
}

module.exports = {
  get
}
