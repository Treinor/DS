'use strict'

var express = require('express');
var COController = require('../controllers/codigob');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.post('/registrarcob',md_auth.ensureAuth, COController.saveCO);
api.get('/listarcob', md_auth.ensureAuth, COController.getCO);
api.put('/editarcob/:id',md_auth.ensureAuth, COController.editarCO);
api.delete('/deletecob/:id_co', md_auth.ensureAuth, COController.deleteCO);
module.exports = api;