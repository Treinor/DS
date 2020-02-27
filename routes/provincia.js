'use strict'

var express = require('express');
var PROController = require('../controllers/provincia');

var api = express.Router();

api.get('/homepro', PROController.homepro);
api.get('/pruebapro', PROController.pruebapro);
api.post('/registrarpro', PROController.savePRO);

module.exports = api;