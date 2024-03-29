const get = require('lodash/get')
const { Redirect } = require('@nudj/framework/errors')
const logger = require('@nudj/framework/logger')
const { cookies } = require('@nudj/library')
const intercom = require('@nudj/library/lib/analytics/intercom')
const { Global } = require('../../lib/graphql')
const requestGql = require('../../lib/requestGql')

async function onboardHirer ({ email }) {
  try {
    const gql = `
      mutation OnboardHirer($email: String!) {
        user: personByFilters(filters: { email: $email }) {
          hirer {
            id
            setOnboarded
            company {
              name
            }
          }
        }
      }
    `

    const variables = {
      email
    }

    const data = await requestGql(null, gql, variables)
    const onboarded = get(data, 'user.hirer.setOnboarded')
    if (!onboarded) throw new Error(`Error setting hirer with ${email} as onboarded`)
    return data
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

async function createAndOnboardHirer ({ email, hash }) {
  try {
    const gql = `
      mutation CreateHirer($email: String!, $hash: String!, $type: HirerType!) {
        company: companyByFilters(filters: { hash: $hash }) {
          name
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

    if (process.env.INTERCOM_ENABLED === 'true') {
      const intercomCompany = await intercom.companies.getBy({ name: data.company.name })
      await intercom.user.getOrCreate({ email })
      await intercom.user.update({
        user: {
          email
        },
        data: {
          companies: [{
            name: intercomCompany.name,
            company_id: intercomCompany.company_id
          }],
          tags: ['team-member']
        }
      })
    }

    const hirer = get(data, 'company.hirer')
    if (!hirer) throw new Error(`Error creating hirer for ${email} at company: ${hash}`)
    return data
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

const acceptInvite = ({ req, res, params, analytics }) => {
  const { email } = req.user._json
  const gql = `
    query GetHirer ($email: String!) {
      user: personByFilters(filters: { email: $email }) {
        hirer {
          id
          onboarded
          company {
            name
          }
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
      let newlyOnboarded = false
      let companyName

      if (!hirer) {
        const response = await createAndOnboardHirer({ email, hash })
        companyName = response.company.name

        newlyOnboarded = true
      } else if (!hirer.onboarded) {
        const response = await onboardHirer({ email })
        companyName = response.user.hirer.company.name

        newlyOnboarded = true
      }

      if (newlyOnboarded) {
        await analytics.updateIdentity({ companyName })
        analytics.track({
          object: analytics.objects.invite,
          action: analytics.actions.invite.accepted
        })

        res.cookie(cookies.getSecureName('newlyOnboarded'), newlyOnboarded, {
          httpOnly: true,
          secure: true
        })
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
