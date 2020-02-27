'use strict'

var express = require('express');
var FUNController = require('../controllers/funcionario');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homefun', FUNController.homefun);
api.get('/pruebafun', md_auth.ensureAuth, FUNController.pruebafun);
api.post('/registrarfun', FUNController.saveFUN);
api.post('/login', FUNController.loguinFun);
api.get('/buscarfun/:id_fun', md_auth.ensureAuth, FUNController.getFun);
api.get('/listarfuns', md_auth.ensureAuth, FUNController.getFuns);
api.put('/actualizarfun/:id_fun', md_auth.ensureAuth, FUNController.updateFun);
api.put('/actualizarfuns/:id_fun', md_auth.ensureAuth, FUNController.updateFuns);
api.put('/cambiar-estado', FUNController.cambiarEstado);
api.put('/cambiar-password/:id', FUNController.passwordChange);
api.post('/comprobar-password/:id',md_auth.ensureAuth, FUNController.passwordCompare);
//api.get('/contadorap/:id_fun', md_auth.ensureAuth, FUNController.getCountap);

module.exports = api;
