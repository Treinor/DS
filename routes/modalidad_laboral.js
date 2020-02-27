'use strict'

var express = require('express');
var MLController = require('../controllers/modalidad_laboral');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homeml', MLController.homeml);
api.get('/pruebaml', MLController.pruebaml);
api.post('/registrarml',md_auth.ensureAuth, MLController.saveML);
api.get('/listarml', md_auth.ensureAuth, MLController.getML);
api.get('/listarmls/:id', md_auth.ensureAuth, MLController.getMLs);
api.put('/editarml/:id',md_auth.ensureAuth, MLController.editarml);

module.exports = api;