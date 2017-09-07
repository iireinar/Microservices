'use strict'

const express = require('express')
const ApplicationRepository = require('../../../repository/application.repository')
const SessionRepository = require('../../../repository/session.repository')
const Urls = require('../utils/url');
const responseApi = require('../utils/response')
const app = module.exports = express()


app.post('/sso/session/validate', (req, res) => {
    let token = req.body.token;

    if (!token) {
        responseApi.error(res, 'Invalid token.')

        return
    }

    SessionRepository
        .findByToken(token)
        .then(session => {
            if (session) res.json(session)
            else responseApi.custom(res, 'Invalid session.', 403)
        })
        .catch(err => {
            responseApi.error(res, 'Error validating token.')
        })
})

app.get('/sso/session/authorize', (req, res) => {
    let client_id = req.query.client_id,
        response_type = req.query.response_type,
        state = req.query.state

    if (!client_id || !response_type) {
        res.redirect('/client-error')
        return
    } else {
        ApplicationRepository
            .findByClientId(client_id)
            .then(app => {
                if (!app) {
                    res.redirect('/client-error')
                    return
                }

                let token = req.cookies[OAUTH_COOKIE]

                if (token) {
                    SessionRepository
                        .findByToken(token)
                        .then(session => {
                            if (!session) {
                                res.clearCookie(OAUTH_COOKIE)
                                res.redirect(urlLogin(client_id, response_type, state))
                            } else {
                                let expires = session.expiration.getTime() - new Date().getTime()
                                let returnUrl = Urls.getQueryStringUrl(app.return_url, { token: token, username: session.username, expires: expires, token_type: 'bearer', state: state })

                                res.redirect(returnUrl)
                            }
                        })
                } else {
                    let loginUrl =
                        res.redirect(urlLogin(client_id, response_type, state))
                }
            })
            .catch(err => {
                responseApi.error(res, err.message)
            })
    }
})

function urlLogin(client_id, response_type, state) {
    return Urls.getQueryStringUrl('/login', { client_id: client_id, response_type: response_type, state: state })
}