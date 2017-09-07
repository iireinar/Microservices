'use strict'

const Application = require('../models/mongo/application')

var ApplicationRepository = (() => {
    var findByClientId = (clientId) => {
        return Application.findOne({ client_id: clientId });
    }

    var findByName = (name) => {
        return Application.findOne({ name: name })
    }

    var removeByName = (name) => {
        return Application.remove({ name: name })
    }

    var create = (name, return_url, client_id, client_secret) => {
        return Application.create({ name: name, return_url: return_url, client_id: client_id, client_secret: client_secret })
    }

    var findAll = () => {
        return Application.find({})
    }

    return { findByClientId, removeByName, findAll, findByName, create }
})();

module.exports = ApplicationRepository