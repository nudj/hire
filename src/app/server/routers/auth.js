const express = require('express')
const passport = require('passport')
const get = require('lodash/get')
const logger = require('@nudj/framework/logger')
const { omitUndefined } = require('@nudj/library')
const { cacheReturnTo, Analytics } = require('@nudj/library/server')
const intercom = require('@nudj/library/lib/analytics/intercom')
const { cookies } = require('@nudj/library')

const requestGql = require('../../lib/requestGql')

async function getPerson (email) {
  try {
    const gql = `
      query GetPerson ($email: String!) {
        person: personByFilters(filters:{ email: $email }) {
          id
          firstName
          lastName
          email
          signedUp
          hirer {
            company {
              name
            }
          }
        }
      }
    `

    const variables = { email }

    return requestGql(null, gql, variables)
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

async function createPerson (input) {
  try {
    const gql = `
      mutation createPerson ($input: PersonCreateInput!) {
        person: createPerson(input: $input) {
          id
          firstName
          lastName
          email
          signedUp
          hirer {
            company {
              name
            }
          }
        }
      }
    `

    const variables = { input }

    const data = await requestGql(null, gql, variables)
    if (!data.person) throw new Error('Error creating person', input.email)
    return data
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

async function updatePerson (id, data) {
  try {
    const gql = `
      mutation updatePerson ($id: ID!, $data: PersonUpdateInput!) {
        person: updatePerson(id: $id, data: $data) {
          id
          firstName
          lastName
          email
          signedUp
          hirer {
            company {
              name
            }
          }
        }
      }
    `

    const variables = { id, data }

    const response = await requestGql(null, gql, variables)
    if (!response.person) throw new Error('Error updating person', data.email)
    return response
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

function getNames (user) {
  const name = user.name ? user.name.split(' ') : ['', '']
  const firstName = user.firstName || user.given_name || name[0]
  const lastName = user.lastName || user.family_name || name[1]
  return {firstName, lastName}
}

function getUserInfo (user) {
  const email = user.email
  const {firstName, lastName} = user.user_metadata ? getNames(user.user_metadata) : getNames(user)
  const url = user.html_url || user.publicProfileUrl || user.url

  return {email, firstName, lastName, url}
}

function passportAuthentication (req, res, next) {
  const hint = req.query && req.query.email
  passport.authenticate('auth0', { login_hint: hint })(req, res, next)
}

const Router = ({
  ensureLoggedIn,
  respondWith
}) => {
  const router = express.Router()

  // Perform session logout and redirect to last known page or homepage
  router.get('/logout', (req, res, next) => {
    req.logOut()
    delete req.session.data
    delete req.session.userId
    delete req.session.analyticsEventProperties
    req.session.logout = true
    req.session.returnTo = req.query.returnTo
    cookies.clear(res, 'session')
    res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${encodeURIComponent(`${process.env.PROTOCOL_DOMAIN}/loggedout`)}&client_id=${process.env.AUTH0_CLIENT_ID}`)
  })

  router.get('/loggedout', (req, res, next) => {
    const returnTo = req.session.returnTo
    req.session.destroy(() => res.redirect(returnTo || '/'))
  })

  router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    async (req, res, next) => {
      if (!req.user) {
        logger.log('error', 'User not returned from Auth0')
        return next('Unable to login')
      }

      const analytics = new Analytics({ app: 'hire', distinctId: req.cookies.mixpanelDistinctId })

      try {
        const { email, firstName, lastName } = getUserInfo(req.user._json)
        const data = await getPerson(email)
        let response

        if (!data.person) {
          response = await createPerson({
            email,
            firstName,
            lastName,
            signedUp: true
          })
        } else if (!data.person.signedUp) {
          response = await updatePerson(
            data.person.id,
            {
              email,
              firstName,
              lastName,
              signedUp: true
            }
          )
        }

        let intercomUser = await intercom.user.getBy({ email })

        if (!intercomUser) {
          const intercomLead = await intercom.lead.getBy({ email })
          if (intercomLead) {
            intercomUser = await intercom.lead.convertToUser(intercomLead)
          } else {
            intercomUser = await intercom.user.create({ email })
          }
        }

        if (response) {
          const firstName = get(response, 'person.firstName')
          const lastName = get(response, 'person.lastName')
          const name = firstName && lastName ? `${firstName} ${lastName}` : undefined

          req.session.userId = response.person.id
          req.session.analyticsEventProperties = omitUndefined({
            name,
            $email: get(response, 'person.email'),
            companyName: get(response, 'person.hirer.company.name')
          })

          await analytics.alias({ alias: response.person.id }, req.session.analyticsEventProperties)
          analytics.track({
            object: analytics.objects.user,
            action: analytics.actions.user.signedUp
          })

          await intercom.user.logEvent({
            user: intercomUser,
            event: {
              name: 'signed up',
              unique: true
            }
          })
        } else {
          const firstName = get(data, 'person.firstName')
          const lastName = get(data, 'person.lastName')
          const name = firstName && lastName ? `${firstName} ${lastName}` : undefined

          req.session.userId = data.person.id
          req.session.analyticsEventProperties = omitUndefined({
            name,
            $email: get(data, 'person.email'),
            companyName: get(data, 'person.hirer.company.name')
          })

          await analytics.identify({ id: data.person.id }, req.session.analyticsEventProperties, {
            preserveTraits: true
          })
          analytics.track({
            object: analytics.objects.user,
            action: analytics.actions.user.loggedIn
          })
        }

        res.redirect(req.session.returnTo || '/')
      } catch (error) {
        logger.log('error', error)
        next('Unable to login')
      }
    }
  )

  router.get('/login', cacheReturnTo, passportAuthentication, (req, res, next) => {
    res.redirect(req.session.returnTo || '/')
  })

  return router
}
module.exports = Router
