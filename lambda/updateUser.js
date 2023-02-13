const axios = require('axios')
const cookieparser = require('cookieparser')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const baseURL = 'https://fabman.io/api/v1/'

// Define routes depending on your environment
let tmpFabmanToken
let tmpClient
let tmpOrigin
switch (process.env.NETLIFY_ENVIRONMENT) {
  case 'develop':
    tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_DEVELOP}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_DEVELOP
    break
  case 'staging':
    tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_STAGING}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_STAGING
    break
  default: // production
    tmpFabmanToken = process.env.FABMAN_TOKEN
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN
}

const fabmanToken = tmpFabmanToken
const client = tmpClient
const origin = tmpOrigin

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
      const fabmanId = decoded[origin + '/fabmanId']

      const instance = axios.create({
        baseURL,
        headers: { Authorization: 'Bearer ' + fabmanToken }
      })

      const data = JSON.parse(event.body)

      instance.put(`members/${fabmanId}`, data).then((r) => {
        const user = {
          firstName: r.data.firstName,
          lastName: r.data.lastName,
          memberNumber: r.data.memberNumber,
          emailAddress: r.data.emailAddress,
          address: r.data.address,
          address2: r.data.address2,
          city: r.data.city,
          zip: r.data.zip,
          lockVersion: r.data.lockVersion
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        })
      }).catch((err) => {
        console.log(err)
        callback(null, {
          statusCode: 500,
          body: 'ERROR'
        })
      })
    } else {
      console.log(err)
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      })
    }
  })
}
