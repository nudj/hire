const get = require('lodash/get')
const { Redirect } = require('@nudj/framework/errors')
const logger = require('@nudj/framework/logger')
const { cookies } = require('@nudj/library')
const { Global } = require('../../lib/graphql')
const requestGql = require('../../lib/requestGql')

async function createAndOnboardHirer ({ email, hash }) {
  try {
    const gql = `
      mutation CreateHirer($email: String!, $hash: String!, $type: HirerType!) {
        company: companyByFilters(filters: { hash: $hash }) {
          hirer: createHirerByEmail(hirer: { type: $type, email: $email }) {
            id
            setOnboarded
          }
        }
      }
    `

    const variables = {
      email,
      hash,
      type: 'MEMBER'
    }

    const data = await requestGql(null, gql, variables)
    const hirer = get(data, 'company.hirer')
    if (!hirer) throw new Error(`Error creating hirer for ${email} at company: ${hash}`)
    return hirer
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

const getCompany = ({ params }) => {
  const gql = `
    query validateCompanyHash ($hash: String!) {
      company: companyByFilters(filters: { hash: $hash }) {
        name
      }
      ${Global}
    }
  `

  const variables = { hash: params.hash }

  return {
    gql,
    variables
  }
}

const acceptInvite = ({ req, res, params }) => {
  const { email } = req.user._json
  const gql = `
    query GetHirer ($email: String!) {
      user: personByFilters(filters: { email: $email }) {
        hirer {
          id
          onboarded
        }
      }
    }
  `

  const variables = { email }

  return {
    gql,
    variables,
    respond: async (data) => {
      const hirer = get(data, 'user.hirer')
      const { hash } = params

      if (!hirer) {
        await createAndOnboardHirer({ email, hash })
        const newlyOnboarded = !get(data, 'user.hirer.onboarded', false)

        if (newlyOnboarded) {
          res.cookie(cookies.getSecureName('newlyOnboarded'), newlyOnboarded, {
            httpOnly: true,
            secure: true
          })
        }
      }

      throw new Redirect({
        url: '/'
      })
    }
  }
}

module.exports = {
  getCompany,
  acceptInvite
}
