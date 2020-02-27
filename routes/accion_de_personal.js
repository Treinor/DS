'use strict'

var express = require('express');
var APController = require('../controllers/accion_de_personal');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/accion_personal'});


api.get('/home', APController.home);
api.get('/pruebaap', APController.pruebaap);
api.post('/registrarap',md_auth.ensureAuth, APController.saveAP);
api.put('/editar-ap/:id',md_auth.ensureAuth, APController.updateAP);
api.get('/buscarap/:id_ap', md_auth.ensureAuth, APController.getAP);
api.get('/listaraps', md_auth.ensureAuth, APController.getAPS);
api.delete('/deleteap/:id_ap', md_auth.ensureAuth, APController.deleteAP);
api.put('/estadoap',md_auth.ensureAuth, APController.estadoap);

api.get('/get-codigos', APController.getCodigos);

// Estadisticas
api.get('/get-contador-activa/:activa', APController.getAPActiva);
api.get('/get-contador-tipo/:tipo', APController.gettipo);


module.exports = api;