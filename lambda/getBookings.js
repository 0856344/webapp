const axios = require('axios')
const cookieparser = require('cookieparser')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const moment = require('moment')
const baseURL = 'https://fabman.io/api/v1/'

// Environment settings
let tmpFabmanToken
let tmpClient
if (process.env.NETLIFY_ENVIRONMENT === 'staging' || process.env.NETLIFY_ENVIRONMENT === 'develop') {
  tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
  tmpClient = jwksClient({
    jwksUri: `${process.env.AUTH0_URL_STAGING}/.well-known/jwks.json`
  })
} else {
  tmpFabmanToken = process.env.FABMAN_TOKEN
  tmpClient = jwksClient({
    jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`
  })
}
const fabmanToken = tmpFabmanToken
const client = tmpClient

// TODO: a hell more of exception handling and general hardening
exports.handler = function (event, context, callback) {
  let token = null
  if (event.headers.cookie) {
    const parsed = cookieparser.parse(event.headers.cookie)
    try {
      token = parsed.jwt
    } catch (err) {
      console.log(err)
      return callback(null, {
        statusCode: 401,
        body: 'Unauthorized'
      })
    }
  }

  if (!token) {
    return callback(null, {
      statusCode: 401,
      body: 'Unauthorized'
    })
  }

  function getKey (header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    })
  }

  jwt.verify(token, getKey, function (err, decoded) {
    if (!err) {
      if (!event.queryStringParameters || !event.queryStringParameters.id) {
        callback(null, {
          statusCode: 500,
          body: 'Error: Invalid Param'
        })
      } else {
        const resourceId = event.queryStringParameters.id

        const instance = axios.create({
          baseURL,
          headers: { Authorization: 'Bearer ' + fabmanToken }
        })

        const untilDate = new moment().add(7, 'days').format('YYYY-MM-DDTHH:mm')
        const fromDate = new moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm')
        const url = `bookings?resource=${resourceId}&fromDateTime=${fromDate}&untilDateTime=${untilDate}&state=confirmed&order=desc`
        instance.get(url).then((r) => {
          const bookings = r.data.map((b) => {
            return {
              title: 'Reserviert',
              class: b.state,
              start: moment(b.fromDateTime).format('YYYY-MM-DD HH:mm'),
              end: moment(b.untilDateTime).format('YYYY-MM-DD HH:mm')
            }
          })
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(bookings)
          })
        }).catch((err) => {
          console.log(err)
          callback(null, {
            statusCode: 500,
            body: 'ERROR'
          })
        })
      }
    } else {
      console.log(err)
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      })
    }
  })
}
