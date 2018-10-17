const { Redirect } = require('@nudj/framework/errors')
const { Global } = require('../../lib/graphql')

const get = ({ params }) => {
  const gql = `
    query (
      $hirerId: ID!
    ) {
      user {
        hirer {
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
      ${Global}
    }
  `
  const variables = {
    hirerId: params.hirerId
  }
  return { gql, variables }
}

const deleteFetcher = ({ params, analytics }) => {
  const gql = `
    query (
      $hirerId: ID!
    ) {
      user {
        hirer {
          company {
            name
            hirer: deleteHirer (
              id: $hirerId
            ) {
              id
              person {
                firstName
                lastName
                email
              }
            }
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    hirerId: params.hirerId
  }

  const respond = data => {
    const { company } = data.user.hirer
    const hirerPerson = company.hirer.person

    // analytics.track({
    //   object: analytics.objects.hirer,
    //   action: analytics.actions.hirer.typeUpdated,
    //   properties: {
    //     newType: hirer.type,
    //     companyName: company.name,
    //     hirerEmail: hirerEmail,
    //     hirerName: `${hirerFirstName} ${hirerLastName}`,
    //     updatedByName: `${userFirstName} ${userLastName}`,
    //     updatedByEmail: userEmail
    //   }
    // })

    throw new Redirect({
      url: `/team`,
      notification: {
        type: 'success',
        message: `${hirerPerson.firstName} ${hirerPerson.lastName} (${hirerPerson.email}) is no longer a hirer for ${company.name}`
      }
    })
  }

  const catcher = () => {
    throw new Redirect({
      url: `/team/${params.hirerId}`,
      notification: {
        type: 'error',
        message: 'Something went wrong while removing the hirer! Please try again.'
      }
    })
  }

  return { gql, variables, respond, catcher }
}

module.exports = {
  get,
  delete: deleteFetcher
}
