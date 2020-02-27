'use strict'

var express = require('express');
var datosExternosController = require('../controllers/datosExternos');

var api = express.Router();

api.get('/cedulas', datosExternosController.getCedulas);
api.get('/correos', datosExternosController.getcorreos);
api.get('/usuarios', datosExternosController.getusuarios);
api.get('/quipux/:cedula', datosExternosController.getQuipux);
api.get('/cedulasper', datosExternosController.getCedulasper);
api.get('/codigoap', datosExternosController.getcodigoap);
api.get('/datoan', datosExternosController.getanm);
api.get('/datorh', datosExternosController.getrhm);
api.get('/datorr', datosExternosController.getrrg);
api.get('/datocn', datosExternosController.getcan);
api.get('/datodp', datosExternosController.getddp);
api.get('/datoes', datosExternosController.geteso);
api.get('/datoml', datosExternosController.getmla);
api.get('/datono', datosExternosController.getnoc);
api.get('/datopa', datosExternosController.getpadi);
api.get('/datorl', datosExternosController.getrla);
api.get('/datouo', datosExternosController.getuor);


module.exports = api;
