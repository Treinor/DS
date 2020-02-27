'use strict'

var express = require('express');
var CAController = require('../controllers/canton');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homeca', CAController.homeca);
api.get('/pruebaca', CAController.pruebaca);
api.post('/registrarca',md_auth.ensureAuth, CAController.saveCA);
api.get('/listarca', md_auth.ensureAuth, CAController.getCA);
api.get('/listarcas/:id', md_auth.ensureAuth, CAController.getCAs);
api.put('/editarca/:id',md_auth.ensureAuth, CAController.editarcn);
module.exports = api;