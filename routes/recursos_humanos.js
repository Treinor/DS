'use strict'

var express = require('express');
var RHController = require('../controllers/recursos_humanos');

var api = express.Router();
var md_auth = require('../middlewares/autentificador');

api.get('/homerh', RHController.homerh);
api.get('/pruebarh', RHController.pruebarh);
api.post('/registrarrh',md_auth.ensureAuth, RHController.saveRH);
api.get('/listarrh', md_auth.ensureAuth, RHController.getRH);
api.put('/estadorh',md_auth.ensureAuth, RHController.estadoRH);
api.get('/listarrhs/:id', md_auth.ensureAuth, RHController.getRHs);
api.put('/editarrh/:id',md_auth.ensureAuth, RHController.editarrh);

module.exports = api;