'use strict'

var express = require('express');
var UOController = require('../controllers/unidad_organica');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homeuo', UOController.homeuo);
api.get('/pruebauo', UOController.pruebauo);
api.post('/registraruo',md_auth.ensureAuth, UOController.saveUO);
api.get('/listaruo', md_auth.ensureAuth, UOController.getUO);
api.get('/listaruos/:id', md_auth.ensureAuth, UOController.getUOs);
api.put('/editaruo/:id',md_auth.ensureAuth, UOController.editaruo);

module.exports = api;