'use strict'

const express = require('express')
const randomstring = require('randomstring')
const ApplicationRepository = require('../../../repository/application.repository')
const responseApi = require('../utils/response')
const application = module.exports = express()


application.post('/sso/application', (req, res) => {
    let name = req.body.name,
        return_url = req.body.return_url

    if (!name || !return_url) {
        responseApi.error(res, 'Empty fields.')
        return
    }

    ApplicationRepository
        .findByName(name)
        .then(app => {
            if (app && app._id) throw new Error('Application already exists.')
        })
        .then(() => {
            return ApplicationRepository.create(name, return_url, randomstring.generate({ length: 15 }), randomstring.generate({ length: 30 }))
        })
        .then(app => {
            if (app && app._id) responseApi.ok(res, 'Application registered.')
            else throw new Error('Error saving application.')
        })
        .catch(err => {
            responseApi.error(res, err.message)
        })
})

application.get('/sso/application', (req, res) => {
    ApplicationRepository
        .findAll()
        .then(apps => {
            if (apps && apps.length > 0) res.json(apps)
            else res.json({})
        })
        .catch(err => {
            responseApi.error(res, err.message)
        })
})

application.delete('/sso/application', (req, res) => {
    let name = req.body.name

    if (!name) {
        responseApi.error(res, 'Empty fields.')
        return
    }

    ApplicationRepository
        .removeByName(name)
        .then(app => {
            responseApi.ok(res, 'ok')
        })
        .catch(err => {
            responseApi.error(res, err.message)
        })
})