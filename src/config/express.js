const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const { logs } = require('./enviroment')
const routes = require('../routes/v1')
const error = require('../middlewares/error')
const path = require('path')

const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

// parse body params and attache them to req.body
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// gzip compression
app.use(compress())

// sets various HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'https://i.ytimg.com']
    }
  }
}))

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// webpage
app.use('/', express.static(path.join(__dirname, '../client/dist')))

// routes
app.use('/v1', routes)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// 404
app.use(error.notFound)

// Error handler
app.use(error.handler)

module.exports = app
