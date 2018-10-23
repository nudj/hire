const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query (
      $hirerId: ID!
    ) {
      user {
        hirer {
          id
          company {
            hirer (
              id: $hirerId
            ) {
              id
              person {
                firstName
                lastName
                email
              }
              type
            }
          }
        }
      }
      hirerTypeEnums: __type(name: "HirerType") {
        values: enumValues {
          name
        }
      }
      ${Global}
    }
  `

  const variables = {
    hirerId: params.hirerId
  }

  const transformData = data => {
    const userHirer = data.user.hirer
    const hirerToEdit = userHirer.company.hirer

    if (hirerToEdit.id === userHirer.id) {
      throw new Redirect({
        url: `/team/${hirerToEdit.id}`,
        notification: {
          type: 'error',
          message: 'You cannot edit your own hirer status. Please ask another admin-level teammate to make the change instead.'
        }
      })
    }

    return data
  }

  return { gql, variables, transformData }
}

const patch = ({ params, body, analytics }) => {
  const gql = `
    query (
      $hirerId: ID!
      $newType: HirerType!
    ) {
      user {
        hirer {
          company {
            name
            hirer (
              id: $hirerId
            ) {
              id
              person {
                firstName
                lastName
                email
              }
              type: updateType (
                type: $newType
              )
            }
          }
        }
      }
      hirerTypeEnums: __type(name: "HirerType") {
        values: enumValues {
          name
        }
      }
      ${Global}
    }
  `
  const variables = {
    hirerId: params.hirerId,
    newType: body.type
  }

  const transformData = data => {
    const company = data.user.hirer.company
    const hirer = company.hirer
    const hirerPerson = hirer.person

    analytics.track({
      object: analytics.objects.hirer,
      action: analytics.actions.hirer.updated,
      properties: {
        newType: hirer.type,
        companyName: company.name,
        hirerEmail: hirerPerson.email,
        hirerName: `${hirerPerson.firstName} ${hirerPerson.lastName}`
      }
    })

    throw new Redirect({
      url: `/team/${params.hirerId}`,
      notification: {
        type: 'success',
        message: 'Teammate updated!'
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/team/${params.hirerId}/edit`,
      notification: {
        type: 'error',
        message: 'Something went wrong while updating your teammate! Please try again.'
      }
    })
  }

  return { gql, variables, transformData, catcher }
}

module.exports = {
  get,
  patch
}
