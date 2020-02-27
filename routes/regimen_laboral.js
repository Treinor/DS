'use strict'

var express = require('express');
var RLController = require('../controllers/regimen_laboral');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homerl', RLController.homerl);
api.get('/pruebarl', RLController.pruebarl);
api.post('/registrarrl',md_auth.ensureAuth, RLController.saveRL);
api.get('/listarrl', md_auth.ensureAuth, RLController.getRL);
api.get('/listarrls/:id', md_auth.ensureAuth, RLController.getRLs);
api.put('/editarrl/:id',md_auth.ensureAuth, RLController.editarrl);

module.exports = api;