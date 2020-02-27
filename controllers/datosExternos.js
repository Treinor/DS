'use strict'
var FUNC = require('../models/funcionario');
var AP = require('../models/accion_de_personal');
var PERS = require('../models/personal');
var ANR = require('../models/autoridad_nominadora');
var RRE = require('../models/responsable_registro');
var RHU = require('../models/recursos_humanos');
var CAN = require('../models/canton');
var DDPU = require('../models/denominacion_de_puesto');
var EOS = require('../models/escala_ocupacional');
var MLA = require('../models/modalidad_laboral');
var NOC = require('../models/nivel_ocupacional');
var PADI = require('../models/puesto_adicional');
var RLA = require('../models/regimen_laboral');
var UOR = require('../models/unidad_organica');


function getCedulas(req, res) {
    FUNC.find({}, {ci_fun: 1, correo: 1, usuario: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', cedulas: resp});
    })
}
function getcorreos(req, res) {
    FUNC.find({}, {correo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista de correos!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros de correos ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista de correos cargadas correctamente!..', correo: resp});
    })
}
function getusuarios(req, res) {
    FUNC.find({}, {usuario: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista de usuarios!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros de usuarios ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista de usuarios cargadas correctamente!..', usuario: resp});
    })
}
function getQuipux(req, res){
    var cedula = req.params.cedula;
    AP.find({ci_per: cedula}, {quipux: 1, _id: 0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista de usuarios!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros de usuarios ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista de usuarios cargadas correctamente!..', listaQuipux: resp});
    })
}
function getcodigoap(req, res){

    AP.find({}, {codigo_ap: 1, _id: 0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista de usuarios!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros de usuarios ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista de usuarios cargadas correctamente!..', listacodigo_ap: resp});
    })
}
function getCedulasper(req, res) {
    PERS.find({}, {cedula: 1, partida_individual: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', cedulas: resp});
    })
}
function getanm(req, res) {
    ANR.find({}, {nombre: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', ans: resp});
    })
}
function getrrg(req, res) {
    RRE.find({}, {nombre: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', rrs: resp});
    })
}
function getrhm(req, res) {
    RHU.find({}, {nombre: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', rhs: resp});
    })
}
function getcan(req, res) {
    CAN.find({}, {nombre: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', cns: resp});
    })
}
function getddp(req, res) {
    DDPU.find({}, {denominacion_puesto: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', dp: resp});
    })
}
function geteso(req, res) {
    EOS.find({}, {escala_ocupacional: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', eo: resp});
    })
}
function getmla(req, res) {
    MLA.find({}, {modalidad_laboral: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', ml: resp});
    })
}
function getnoc(req, res) {
    NOC.find({}, {nivel_ocupacional: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', no: resp});
    })
}
function getpadi(req, res) {
    PADI.find({}, {puesto_adicional: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', pad: resp});
    })
}
function getrla(req, res) {
    RLA.find({}, {regimen_laboral: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', rl: resp});
    })
}
function getuor(req, res) {
    UOR.find({}, {unidad_organica: 1, codigo: 1, _id:0}, (err, resp)=> {
        if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor...', Error: err})
        if (!resp) return res.status(404).send({Message:'Error al mostar la lista!!...'});
        if (resp.length <=0) return res.status(200).send({Message: 'No existen registros ingresadas anteriormente en el sistema!!!...'});
        return res.status(200).send({Message:'Lista cargadas correctamente!..', uo: resp});
    })
}

module.exports = {
    getCedulas,
    getcorreos,
    getusuarios,
    getQuipux,
    getCedulasper,
    getcodigoap,
    getanm,
    getrhm,
    getrrg,
    getcan,
    getddp,
    geteso,
    getmla,
    getnoc,
    getpadi,
    getrla,
    getuor
}