'use strict'

let express = require('express')
let path = require('path')
let app = module.exports =  express()

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
