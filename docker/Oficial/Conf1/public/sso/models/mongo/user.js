'use strict'

const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required:true, unique: true}
})


module.exports = mongoose.model('users', userSchema)