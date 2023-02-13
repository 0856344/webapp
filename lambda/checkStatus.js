const axios = require('axios')
const baseURL = 'https://fabman.io/api/v1/'

// Environment settings
let tmpFabmanToken
if (process.env.NETLIFY_ENVIRONMENT === 'staging' || process.env.NETLIFY_ENVIRONMENT === 'develop') {
  tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
} else {
  tmpFabmanToken = process.env.FABMAN_TOKEN
}
const fabmanToken = tmpFabmanToken

exports.handler = function (event, context, callback) {
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

    const resource = instance.get(`resources/${resourceId}`).then((r) => {
      return {
        id: r.data.id,
        name: r.data.name,
        type: r.data.type,
        state: r.data.state,
        maintenanceNotes: r.data.maintenanceNotes
      }
    })
    const bridge = instance.get(`resources/${resourceId}/bridge`).then((r) => {
      return {
        inUse: r.data.inUse,
        offline: r.data.offline
      }
    })

    Promise.all([resource, bridge]).then(([resource, bridge]) => {
      const data = { ...resource, ...bridge }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      })
    }).catch((err) => {
      console.log(err)
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      })
    })
  }
}
