'use strict'

const User = require('../models/mongo/user')
const md5 = require('md5')

var UserRepository = (() => {
    var findByUsernameAndPassword = (username, password) => {
        return User.findOne({ username: username, password: md5(password) })
    }

    var findByUsername = (username) => {
        return User.findOne({ username: username })
    }

    var findByEmail = (email) => {
        return User.findOne({ email: email })
    }

    var create = (username, email, password) => {
        return User.create({ username: username, email: email, password: md5(password) })
    }

    return { findByUsernameAndPassword, findByUsername, findByEmail, create }
})();

module.exports = UserRepository