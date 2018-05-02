const { Global } = require('../../lib/graphql')

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
    const hirerTypeEnums = data.hirerTypeEnum.values
    const hirerTypes = hirerTypeEnums.reduce((allEnums, nextEnum) => {
      allEnums[nextEnum.name] = nextEnum.name
      return allEnums
    }, {})

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
