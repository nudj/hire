const express = require('express')
const get = require('lodash/get')
const logger = require('@nudj/framework/logger')

const { ensureValidCompanyHash, ensureNoAccessRequestsPending } = require('../../lib/middleware')
const requestGql = require('../../lib/requestGql')

async function getHirer (email) {
  try {
    const gql = `
      query GetHirer ($email: String!) {
        person: personByFilters(filters: { email: $email }) {
          hirer {
            id
          }
        }
      }
    `
    const variables = { email }

    const response = await requestGql(null, gql, variables)
    const hirer = get(response, 'person.hirer')
    return hirer
  } catch (error) {
    logger.log('error', error.log || error)
    throw error
  }
}

async function createHirer ({ email, hash }) {
  try {
    const gql = `
      mutation CreateHirer($email: String!, $hash: String!, $type: HirerType!) {
        company: companyByFilters(filters: { hash: $hash }) {
          hirer: createHirerByEmail(hirer: { type: $type, email: $email }) {
            id
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

const Router = ({
  ensureLoggedIn
}) => {
  const router = express.Router()

  router.get(
    '/invitation-accept/:hash',
    ensureValidCompanyHash,
    (req, res, next) => {
      req.session.returnTo = `/invitation-accept/${req.params.hash}`
      next()
    },
    ensureLoggedIn,
    ensureNoAccessRequestsPending,
    async (req, res) => {
      const { email } = req.user._json
      const { hash } = req.params
      const hirer = await getHirer(email)

      if (!hirer) {
        await createHirer({ email, hash })
      }

      res.redirect('/')
    }
  )

  return router
}

module.exports = Router
