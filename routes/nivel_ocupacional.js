'use strict'

var express = require('express');
var NOController = require('../controllers/nivel_ocupacional');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homeno', NOController.homeno);
api.get('/pruebano', NOController.pruebano);
api.post('/registrarno',md_auth.ensureAuth, NOController.saveNO);
api.get('/listarno', md_auth.ensureAuth, NOController.getNO);
api.get('/listarnos/:id', md_auth.ensureAuth, NOController.getNOs);
api.put('/editarno/:id',md_auth.ensureAuth, NOController.editarno);

module.exports = api;