'use strict'

var express = require('express');
var COController = require('../controllers/codigo');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.post('/registrarco',md_auth.ensureAuth, COController.saveCO);
api.get('/listarco', md_auth.ensureAuth, COController.getCO);
api.put('/editarco/:id',md_auth.ensureAuth, COController.editarCO);
api.delete('/deleteco/:id_co', md_auth.ensureAuth, COController.deleteCO);
module.exports = api;