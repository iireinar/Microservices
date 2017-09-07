'use strict'

const mongoose = require('mongoose')

var applicationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    client_id: { type: String, required: true },
    client_secret: { type: String, required: true },
    return_url: { type: String, required: true }
})

module.exports = mongoose.model('applications', applicationSchema)