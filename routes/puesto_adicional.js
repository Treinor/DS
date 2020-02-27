'use strict'

var express = require('express');
var PADController = require('../controllers/puesto_adicional');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');
api.get('/homepad', PADController.homepad);
api.get('/pruebapad', PADController.pruebapad);
api.post('/registrarpad', md_auth.ensureAuth, PADController.savePAD);
api.get('/listarpad', md_auth.ensureAuth, PADController.getPAD);
api.get('/listarpads/:id', md_auth.ensureAuth, PADController.getPADs);
api.put('/editarpad/:id',md_auth.ensureAuth, PADController.editarpad);

module.exports = api;