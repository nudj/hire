const { Redirect } = require('@nudj/framework/errors')
const { intercom } = require('@nudj/library/analytics')
const logger = require('@nudj/framework/logger')

const { createNotification } = require('../../lib')

const triggerIntercomTracking = async (data, body) => {
  try {
    const { email } = data.user
    const companyName = body.name

    // Create company and fetch user
    const [ company, user ] = await Promise.all([
      intercom.companies.getOrCreate({
        name: companyName,
        company_id: companyName,
        custom_attributes: {
          location: body.location
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

const get = () => {
  const gql = `
    mutation GetEnrichmentData {
      enrichmentData: getCompanyEnrichmentDataByUserEmail
    }
  `

  return { gql }
}

const post = ({ body }) => {
  const gql = `
    mutation setupCompany ($company: CompanyCreateInput!) {
      user {
        email
        addCompanyAndAssignUserAsHirer(company: $company) {
          id
        }
      }
    }
  `
  const variables = {
    company: {
      ...body,
      client: true
    }
  }
  const respond = data => {
    triggerIntercomTracking(data, body)

    const companyName = body.name
    throw new Redirect({
      url: '/setup-jobs',
      notification: createNotification(
        'success',
        `${companyName} created!`
      )
    })
  }
  const catcher = () => {
    throw new Redirect({
      url: '/setup-company',
      notification: {
        type: 'error',
        message: 'Something went wrong while setting up your company! Please try again.'
      }
    })
  }

  return { gql, variables, catcher, respond }
}

module.exports = {
  get,
  post
}
