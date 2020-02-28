'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//cargar rutas
var accion_personal_routes = require('./routes/accion_de_personal')
var autoridad_nominadora_routes = require('./routes/autoridad_nominadora')
var canton = require('./routes/canton')
var denominacion_puesto = require('./routes/denominacion_de_puesto')
var escala_ocupacional = require('./routes/escala_ocupacional')
var funcionario = require('./routes/funcionario')
var modalidad_laboral = require('./routes/modalidad_laboral')
var nivel_ocupacional = require('./routes/nivel_ocupacional')
var personal = require('./routes/personal')
var provincia = require('./routes/provincia')
var puesto_adicional = require('./routes/puesto_adicional')
var recursos_humanos = require('./routes/recursos_humanos')
var regimen_laboral = require('./routes/regimen_laboral')
var datosExternos = require('./routes/datosExternos')
var responsable_registro = require('./routes/responsable_registro')
var unidad_organica = require('./routes/unidad_organica')
var codigo = require('./routes/codigo')
var codigob = require('./routes/codigob')
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/', express.static('client', { redirect: false }))

//cors
// Configuracion para intercambio de recursos de origenes cruzados CORS //
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//rutas
app.use('/api', accion_personal_routes);
app.use('/api', datosExternos);
app.use('/api', autoridad_nominadora_routes);
app.use('/api', canton);
app.use('/api', denominacion_puesto);
app.use('/api', escala_ocupacional);
app.use('/api', funcionario);
app.use('/api', modalidad_laboral);
app.use('/api', nivel_ocupacional);
app.use('/api', personal);
app.use('/api', provincia);
app.use('/api', puesto_adicional);
app.use('/api', recursos_humanos);
app.use('/api', regimen_laboral);
app.use('/api', responsable_registro);
app.use('/api', unidad_organica);
app.use('/api', codigo);
app.use('/api', codigob);
//exportar
app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
});
module.exports = app;

