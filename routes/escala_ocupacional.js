'use strict'

var express = require('express');
var EOController = require('../controllers/escala_ocupacional');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homeeo', EOController.homeeo);
api.get('/pruebaeo', EOController.pruebaeo);
api.post('/registrareo', md_auth.ensureAuth, EOController.saveEO);
api.get('/listareo', md_auth.ensureAuth, EOController.getEO);
api.get('/listareos/:id', md_auth.ensureAuth, EOController.getEOs);
api.put('/editareo/:id',md_auth.ensureAuth, EOController.editareo);
module.exports = api;