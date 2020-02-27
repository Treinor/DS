'use strict'

var express = require('express');
var DPController = require('../controllers/denominacion_de_puesto');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homedp', DPController.homedp);
api.get('/pruebadp', DPController.pruebadp);
api.post('/registrardp',md_auth.ensureAuth, DPController.saveDP);
api.get('/listardp', md_auth.ensureAuth, DPController.getDP);
api.get('/listardps/:id', md_auth.ensureAuth, DPController.getDPs);
api.put('/editardp/:id',md_auth.ensureAuth, DPController.editardp);
api.delete('/borrardp/:id',md_auth.ensureAuth, DPController.deletedp);

module.exports = api;