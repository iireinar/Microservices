'use strict'

const express = require('express')
const UserRepository = require('../../../repository/user.repository')
const ApplicationRepository = require('../../../repository/application.repository')
const SessionRepository = require('../../../repository/session.repository')
const responseApi = require('../utils/response')
const uuid = require('node-uuid')
const Urls = require('../utils/url')
const app = module.exports = express()


app.post('/sso/user', (req, res) => {
    let username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        confirm_password = req.body.confirm_password

    if (!username || !email || !password || !confirm_password) {
        responseApi.error(res, 'Empty fields.')
        return
    }

    if (password !== confirm_password) {
        responseApi.error(res, 'Password don\'t match.')
        return
    }

    UserRepository
        .findByUsername(username)
        .then(user => {
            if (user && user._id) throw new Error('Username already exists.')
            else return UserRepository.findByEmail(email)
        })
        .then(user => {
            if (user && user._id) throw new Error('Email already exists.')
        })
        .then(() => {
            return UserRepository.create(username, email, password)
        })
        .then(user => {
            if (user && user._id) res.json(user)
            else throw new Error('Error saving user.')
        })
        .catch(err => {
            responseApi.error(res, err.message)
        })
})

app.post('/sso/user/login', (req, res) => {
    let username = req.body.username,
        password = req.body.password,
        client_id = req.body.client_id,
        response_type = req.body.response_type,
        state = req.body.state

    if (!username || !password || !client_id || !response_type) {
        responseApi.error(res, 'Empty fields.')
        return
    }

    ApplicationRepository
        .findByClientId(client_id)
        .then(app => {
            if (!app) responseApi.error(res, 'Invalid client id.', 'client_error')
            else {
                UserRepository
                    .findByUsernameAndPassword(username, password)
                    .then(user => {
                        if (user) {
                            let token = uuid.v1()
                            let expiration = new Date()
                            expiration.setHours(expiration.getHours() + 12)

                            SessionRepository
                                .create(token, user.username, expiration)
                                .then(session => {
                                    let maxAge = 12 * 60 * 60;
                                    let options = {
                                        maxAge: 1000 * maxAge,
                                        httpOnly: true,
                                        signed: false
                                    }
                                    let returnUrl = Urls.getQueryStringUrl(app.return_url, { token: token, username: username, expires: maxAge, token_type: 'bearer', state: state })
                                    res.cookie(OAUTH_COOKIE, token, options)
                                    responseApi.ok(res, null, returnUrl)
                                })
                                .catch(err => {
                                    responseApi.custom(res, true, 'Error on authentication.', 401)
                                })
                        } else responseApi.custom(res, 'Invalid username/password.', 401)
                    })
            }
        }).catch(err => {
            responseApi.custom(res, 'Error on authentication.', 500)
        })
})