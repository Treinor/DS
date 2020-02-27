'use strict'

var ADP = require('../models/accion_de_personal');
var path = require('path');
var fs = require('module');
var mongoosePaginate = require('mongoose-pagination');
var moment = require('moment');

var fun = require('../models/funcionario');

function home(req, res) {
    res.status(200).send({
        message: 'Prueba de todo AP'
    });
}

function pruebaap(req, res) {
    res.status(200).send({
        message: 'Accion de personal'
    });
}
//guardar acciones de personal
function saveAP(req, res) {
    var params = req.body;


    if (!params.codigo_ap && !params.lugar_de_trabajo_sa) return res.status(200).send({ message: 'Faltan campos obligatorios!!' });
    var AP = new ADP();
    AP.codigo_ap = params.codigo_ap;
    AP.fecha = params.fecha;
    AP.tipo = params.tipo;
    AP.tipo_numero = params.tipo_numero;
    AP.tipo_fecha = params.tipo_fecha;
    AP.apellidos = params.apellidos;
    AP.nombres = params.nombres;
    AP.ci_per = params.ci_per;
    AP.no_af_iess = params.no_af_iess;
    AP.vigencia = params.vigencia;
    AP.explicacion = params.explicacion;
    AP.motivo = params.motivo;
    AP.motivoExtra = params.motivoExtra;
    AP.proceso_sa = params.proceso_sa;
    AP.sbp_sa = params.sbp_sa;
    AP.puesto_sa = params.puesto_sa;
    AP.lugar_de_trabajo_sa = params.lugar_de_trabajo_sa;
    AP.salario_sa = params.salario_sa;
    AP.partida_presupuestaria_sa = params.partida_presupuestaria_sa;
    AP.proceso_sp = params.proceso_sp;
    AP.sbp_sp = params.sbp_sp;
    AP.puesto_sp = params.puesto_sp;
    AP.lugar_de_trabajo_sp = params.lugar_de_trabajo_sp;
    AP.salario_sp = params.salario_sp;
    AP.partida_presupuestaria_sp = params.partida_presupuestaria_sp;
    AP.af_numero = params.af_numero;
    AP.af_fecha = params.af_fecha;
    AP.activa = false;
    AP.rec_hum = params.rec_hum;
    AP.res_reg = params.res_reg;
    AP.aut_nom = params.aut_nom ;
    AP.caucion = params.caucion;
    AP.caucion_fecha = params.caucion_fecha;
    AP.caucion_exp = params.caucion_exp;
    AP.remplaza = params.remplaza;
    AP.rem_puesto = params.rem_puesto;
    AP.ceso_fun = params.ceso_fun;
    AP.num_ac_rem = params.num_ac_rem;
    AP.fec_ac_rem = params.fec_ac_rem;
    AP.afi_col = params.afi_col;
    AP.cod_rem = params.cod_rem;
    AP.fecha_rem = params.fecha_rem;
    AP.lugar = params.lugar;
    AP.fecha_fi = params.fecha_fi;
    AP.codigo_rh = params.codigo_rh;
    AP.nombre_pc = params.nombre_pc;
    AP.cedula_pc = params.cedula_pc;
    AP.quipux = params.quipux;
    AP.fecha_activacion = params.fecha_activacion
    AP.autor = req.fun.sub;

    AP.save((err, APStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar accion de personal' });
        if (!APStored) return res.status(200).send({ message: 'La accion de personal no ha sido guardada' })
        return res.status(200).send({ AP: APStored });

    });

}
//listar acciones de personal
function getAPS(req, res) {
    var identity_ap_id = req.params.id_ap;


    ADP.find().sort('_id').populate('autor').exec((err, aps) => {
        if (err) return res.status(500).send({ message: 'Error al mostrar todos las acciones de personal' })

        if (!aps) return res.status(404).send({ message: 'No hay acciones de personal disponibles' });

        if (aps.length <=0) return res.status(200).send({message: 'No se han ingresado acciones de personal'})

        return res.status(200).send({
            aps, message: 'Exito al Devolver la lista de acciones de personal'
        })
    });
}
//buscar acciones de personal
function getAP(req, res) {
    var id_ap = req.params.id_ap;

    ADP.findById(id_ap, (err, AP) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!AP) return res.status(404).send({ message: 'La accion de personal no existe' });

        return res.status(200).send({ AP });
    });
}
//eliminar acciones de personal

function deleteAP(req, res) {
    var AP_id = req.params.id;
    ADP.findByIdAndRemove(AP_id, (err, APRemoved) => {
        if (err) return res.status(500).send({ message: 'Error al borrar Accion de personal' });

        if (!APRemoved) return res.status(404).send({ message: 'No se ha borrado accion de personal' });

        return res.status(200).send({ message: 'Accion de Personal Eliminada' })
    });
}
function updateAP(req, res) {
    var id = req.params.id;
    var params = req.body;
    ADP.findByIdAndUpdate(id, params, {new : true}, (error, response) => {
        if (error) return res.status(500).send({message: 'error al ejectuar la peticion en el servidor....', error});
        if (!response) return res.status(404).send({message: 'no se pudo actualizar la accion del personal'});
        return res.status(200).send({message: 'accion del personal editada correctamente!!...', AP: response});
    })
}
function estadoap(req, res) {
      
    var id = req.body._id;
    var activa = req.body.activa;
    //var fecha_activacion = moment().unix();
    ADP.findByIdAndUpdate(id, {activa}, {new:true}, (err, response)=> {
            if (err) return res.status(500).send({Message: 'Error al ejectuar la peticion... ', Error: err});
            if (!response || response.length <=0) return res.status(404).send({Message: 'No se encuentra la accion de personal'});
            return res.status(200).send({Message: 'Accion de personal editado con exito'});
    })
}
function getCodigos (req, res) {
    ADP.find({}, {codigo_ap: 1, _id:0}, (error, response) => {
        if (error) return res.status(500).send({Message: 'Error al conectar con la base de datos', Error: error});
        if (!response) return res.status(404).send({Message: 'Error en el Servidor, no se pudieron cargar los codigos'});
        if (response && response.length <=0) return res.status(200).send({Message: 'no existen codigos de accion de personal'});
        return res.status(200).send({Message: 'codigos de accion de personal encontrados', Codigos: response});
    })
}
function getAPActiva (req, res) {
    var activa = req.body.activa;
    ADP.countDocuments({activa}).exec().then((count)=> {
        return res.status(200).send({Message: 'Medidores por Sector correcto', ap: count});
    })
}
function gettipo (req, res) {
    ADP.countDocuments({tipo: req.body.tipo}).exec().then((count)=> {
        return res.status(200).send({Message: 'Medidores por Sector correcto', ap: count});
    })
}
module.exports = {
    home,
    pruebaap,
    saveAP,
    getAPS,
    getAP,
    deleteAP,
    updateAP,
    estadoap,
    getCodigos,
    gettipo,
    getAPActiva
}