'use strict'

const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


var Config = (() => {
    var loadProperties = (mode) => {
        if (mode && mode === 'PROD') this.__properties = require('./properties_prod')
        else this.__properties = require('./properties_dev')
    }

    var configBodyParser = () => {
        this.__app.use(bodyParser.urlencoded({ extended: false }))
        this.__app.use(bodyParser.json())
    }

    var configCors = () => {
        this.__app.use(require('cors')())
    }

    var views = () => {
        console.info('Loading view...')

        this.__app.use(require('../web/view/'))
    }

    var api = () => {
        console.info('Loading apis...')

        global.OAUTH_COOKIE = 'ssoNoface'

        this.__app.use(require('cookie-parser')())
        this.__app.use(require('body-parser').urlencoded({ extended: true }));
        this.__app.use(require('../web/api/application'))
        this.__app.use(require('../web/api/user'))
        this.__app.use(require('../web/api/session'))
    }

    var staticContent = () => {
        console.info('Exposing static content...')

        this.__app.use(express.static(path.join(__dirname, '../dist')))
    }

    var mongo = (cb) => {
        console.info('Configuring mongo...')

        mongoose.Promise = require('q').Promise;

        mongoose.connect(this.__properties.mongo.url)
            .then(() => {
                cb()
            })
            .catch(err => {
                console.error('Error connecting to mongodb!!')
                console.error(err.stack)
                process.exit(1)
            })
    }

    var init = (app, mode, cb) => {
        this.__app = app

        configBodyParser()
        configCors()
        loadProperties(mode)
        api()
        staticContent()
        mongo(cb)
        views()
    }

    return { init }
})();

module.exports = Config