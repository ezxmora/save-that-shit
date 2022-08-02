'use strict'

const app = require('./config/express')
const { port, env } = require('./config/enviroment')

app.listen(port, () => console.log(`Express started on port :${port} @ ${env} env`))

module.exports = app
