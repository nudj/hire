const get = require('lodash/get')
const { Redirect } = require('@nudj/framework/errors')
const intercom = require('@nudj/library/lib/analytics/intercom')
const { ALREADY_EXISTS } = require('@nudj/library/lib/errors/constants')
const logger = require('@nudj/framework/logger')
const { cookies } = require('@nudj/library')

const requestGql = require('../../lib/requestGql')
const { Global } = require('../../lib/graphql')

const fetchCompanySlug = async companyId => {
  const gql = `
    query fetchCompanySlug ($companyId: ID!) {
      company(id: $companyId) {
        slug
      }
      ${Global}
    }
  `
  const variables = { companyId }

  const { company } = await requestGql(null, gql, variables)
  return company.slug
}

const triggerIntercomTracking = async data => {
  try {
    const { email, newHirer } = data.user
    const {
      name: companyName,
      location: companyLocation
    } = newHirer.company

    // Create company and fetch user
    const [ company, user ] = await Promise.all([
      intercom.companies.getOrCreate({
        name: companyName,
        company_id: companyName,
        custom_attributes: {
          location: companyLocation
        }
      }),
      intercom.user.getBy({ email })
    ])

    // Add user to company and log company creation event
    await Promise.all([
      intercom.user.update({
        user,
        data: {
          companies: [{
            company_id: company.company_id,
            id: company.id,
            name: company.name
          }]
        }
      }),
      intercom.user.logEvent({
        user,
        event: {
          name: 'created company',
          metadata: {
            company: company.name
          }
        }
      })
    ])
  } catch (error) {
    logger.log('error', error)
  }
}

const getEnrichmentData = () => {
  const gql = `
    mutation GetEnrichmentData {
      enrichmentData: getCompanyEnrichmentDataByUserEmail
      ${Global}
    }
  `

  return { gql }
}

const post = ({ res, body, analytics }) => {
  const gql = `
    mutation setupCompany ($company: CompanyCreateInput!) {
      user {
        email
        newHirer: addCompanyAndAssignUserAsHirer(company: $company) {
          setOnboarded
          id
          company {
            name
            location
          }
        }
      }
      ${Global}
    }
  `
  const variables = {
    company: {
      ...body,
      client: true
    }
  }

  const respond = async data => {
    triggerIntercomTracking(data)
    cookies.set(res, 'newlyOnboarded', true)

    await analytics.updateIdentity({
      companyName: data.user.newHirer.company.name
    })

    analytics.track({
      object: analytics.objects.company,
      action: analytics.actions.company.created
    })

    throw new Redirect({ url: '/' })
  }

  const catcher = async error => {
    // Check to ensure error type and that request access flow is enabled
    if (get(error, 'errors[0].type') === ALREADY_EXISTS && process.env.FEATURE_REQUEST_ACCESS === 'true') {
      const slug = await fetchCompanySlug(error.errors[0].identifier)
      throw new Redirect({ url: `/request-access/${slug}` })
    } else {
      throw new Redirect({
        url: '/setup-company',
        notification: {
          type: 'error',
          message: 'Something went wrong while setting up your company! Please try again.'
        }
      })
    }
  }

  return { gql, variables, catcher, respond }
}

module.exports = {
  get: getEnrichmentData,
  post
}
