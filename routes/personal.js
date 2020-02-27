'use strict'

var express = require('express');
var PERController = require('../controllers/personal');
var md_auth = require('../middlewares/autentificador');

var api = express.Router();

api.get('/homeper', PERController.homeper);
api.get('/pruebaper', PERController.pruebaper);
api.post('/registrarper',md_auth.ensureAuth, PERController.savePER);
api.get('/listarpers', md_auth.ensureAuth, PERController.getpers);
api.get('/verpers/:id', md_auth.ensureAuth, PERController.getper);
api.get('/findpers/:id', md_auth.ensureAuth, PERController.findPer);
api.put('/actualizarper/:id', md_auth.ensureAuth, PERController.updatePer);
api.put('/cambiar-estadoper', PERController.cambiarEstado);
api.get('/ver-por-ci/:ci',PERController.findByCi);
api.put('/editar-p/:id',md_auth.ensureAuth, PERController.updatep);
module.exports = api;