'use strict'

var Urls = (() => {
    var getQueryStringUrl = (url, params) => {
        let urlString = url;

        if (params) {
            urlString += '?';

            for (let param in params) {
                urlString += param + '=' + params[param] + '&'
            }
        }

        return urlString;
    }

    return { getQueryStringUrl }
})();

module.exports = Urls