'use strict'

var express = require('express');
var RRController = require('../controllers/responsable_registro');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homerr', RRController.homerr);
api.get('/pruebarr', RRController.pruebarr);
api.post('/registrarrr',md_auth.ensureAuth, RRController.saveRR);
api.get('/listarrr', md_auth.ensureAuth, RRController.getRR);
api.put('/estadorr',md_auth.ensureAuth, RRController.estadoRR);
api.get('/listarrrs/:id', md_auth.ensureAuth, RRController.getRRs);
api.put('/editarrr/:id',md_auth.ensureAuth, RRController.editarrr);


module.exports = api;