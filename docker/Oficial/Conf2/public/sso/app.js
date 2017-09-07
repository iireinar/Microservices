'use strict'

const express = require('express')
const app = express()
const argv = require('optimist').argv
const PORT = argv.port
const MODE = argv.mode

require('./conf').init(app, MODE, () => {app.listen(PORT);console.info(`NoFace SSO started on ${PORT}`)})
