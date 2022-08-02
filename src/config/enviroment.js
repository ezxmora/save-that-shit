const path = require('path')

require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example')
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.port,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
}
