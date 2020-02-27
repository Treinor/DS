'use strict'

var express = require('express');
var ANController = require('../controllers/autoridad_nominadora');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homean', ANController.homean);
api.get('/pruebaan', ANController.pruebaan);
api.post('/registraran',md_auth.ensureAuth, ANController.saveAN);
api.get('/listaran', md_auth.ensureAuth, ANController.getAN);
api.get('/listarans/:id', md_auth.ensureAuth, ANController.getANs);
api.put('/estadoan',md_auth.ensureAuth, ANController.estadoan);
api.put('/editaran/:id',md_auth.ensureAuth, ANController.editarAn);
api.delete('/deletean/:id',md_auth.ensureAuth, ANController.deleteAN);



module.exports = api;
