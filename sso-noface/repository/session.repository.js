'use strict'

const Session = require('../models/mongo/session')

var SessionRepository = (() => {
    var create = (token, username, expiration) => {
        return Session.create({ token: token, username: username, expiration: expiration })
    }

    var findByToken = (token) => {
        return Session.findOne({ token: token });
    }

    return { create, findByToken }
})();

module.exports = SessionRepository