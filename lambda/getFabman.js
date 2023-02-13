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
  const instance = axios.create({
    baseURL,
    headers: { Authorization: 'Bearer ' + fabmanToken }
  })

  const p = instance.get('packages').then(r => r.data.map((p) => {
    return {
      id: p.id,
      name: p.name
    }
  }))
  const t = instance.get('training-courses').then(r => r.data.map((t) => {
    return {
      id: t.id,
      title: t.title
    }
  }))
  const r = instance.get('resources').then(r => r.data.map((r) => {
    return {
      id: r.id,
      name: r.name,
      type: r.type
    }
  }))
  const rt = instance.get('resource-types').then(r => r.data.map((r) => {
    return {
      id: r.id,
      name: r.name
    }
  }))

  Promise.all([p, t, r, rt]).then(([packages, trainings, resources, types]) => {
    const data = { packages, trainings, resources, types }
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
