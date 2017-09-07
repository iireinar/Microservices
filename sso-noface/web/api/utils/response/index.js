'use strict'

var ResponseApi = (() => {
    var error = (res, message, status = null) => {
        custom(res, message, 400, status)
    }

    var ok = (res, message, customInfo = null) => {
        custom(res, message, 200, null, customInfo)
    }

    var custom = (res, message, returnCode, status = null, customInfo = null) => {
        let json = {}

        if (message) json.message = message
        if (status) json.status = status
        if (customInfo) json.customInfo = customInfo

        res.status(returnCode)
        res.json(json)
    }

    return { ok, error, custom }
})();

module.exports = ResponseApi