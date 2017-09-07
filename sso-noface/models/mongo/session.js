'use strict'

const mongoose = require('mongoose')

var sessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  expiration: { type: Date, required: true }
})

module.exports = mongoose.model('sessions', sessionSchema)