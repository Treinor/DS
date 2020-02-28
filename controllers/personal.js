'use strict'

var PERS = require('../models/personal');
var moment = require('moment');
function homeper(req, res) {
        res.status(200).send({
                message: 'Prueba de todo personal'
        });
}

function pruebaper(req, res) {
        res.status(200).send({
                message: 'personal'
        });
}

function savePER(req, res) {
        var params = req.body;
        var PER = new PERS();
        
        if (params.cedula && params.nombres && params.apellidos && params.canton) {

                PER.partida_individual = params.partida_individual;
                PER.rmu_puesto = params.rmu_puesto;
                PER.codigo_sucursal = params.codigo_sucursal;
                PER.cedula = params.cedula;
                PER.nombres = params.nombres;
                PER.apellidos = params.apellidos;
                PER.estructura_programatica = params.estructura_programatica;
                PER.puesto_adicional = params.puesto_adicional;
                PER.nivel_ocupacional = params.nivel_ocupacional;
                PER.regimen_laboral = params.regimen_laboral;
                PER.denominacion_puesto = params.denominacion_puesto;
                PER.modalidad_laboral = params.modalidad_laboral;
                PER.unidad_organica = params.unidad_organica;
                PER.escala_ocupacional = params.escala_ocupacional;
                PER.provincia = params.provincia;
                PER.canton = params.canton;
                PER.autor = req.fun.sub;
                PER.fecha_autor = moment().unix();
                PER.editor = '';
                PER.fecha_editor = '';
                PER.asignado= null;
                PER.memorandum = params.memorandum;
                PER.codigoAP = params.codigoAP;
                PER.activa = true;
                PERS.find({
                        $or: [{ cedula: PER.cedula.toLowerCase() },
                        { partida_individual: PER.partida_individual.toLowerCase() }
                        ]
                }).exec((err, pers) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion de personal' , Error: err});
                        if (pers && pers.length >= 1) {
                                return res.status(200).send({ message: 'El personal que intenta registrar ya existe', pers })
                        } else {
                                PER.save((err, perStored) => {
                                        if (err) return res.status(500).send({ message: 'Error al guardar personal', Error: err }), console.error(err);
                                        if (perStored) {
                                                return res.status(200).send({ message: 'Exito al guardar personal', PER: perStored });
                                        } else {
                                                return res.status(404).send({ message: 'No se ha registrado personal' });
                                        }
                                });
                        }
                });

        } else {
                res.status(200).send({
                        message: 'Faltan campos obligatorios!!'
                });
        }
        
}
function updatePer(req, res) {
        var per_id = req.params.id;
        var update = req.body;
        update.editor = req.fun.sub;
        update.fecha_editor = moment().unix();
        //borrar propiedad cedula

        delete update.cedula
        PERS.find({
                $or: [{ partida_individual: update.partida_individual},
                ]
        }).exec((err, pers) => {
                var per_isset = false;
                pers.forEach((per) => {
                        if (per && per._id != per_id) per_isset = true;
                });
                if (per_isset) return res.status(404).send({ message: 'Los datos ya estan en uso' });

                PERS.findByIdAndUpdate(per_id, update, { new: true }, (err, perUpdated) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })

                        if (!perUpdated) return res.status(404).send({ message: 'No se ha podido actulizar al miembro del personal' });
                        return res.status(200).send({ per: perUpdated })
                });
        });


}
function getpers(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                PERS.find().sort([
                        ['apellidos', 'asc']
                ]).populate('escala_ocupacional canton nivel_ocupacional puesto_adicional regimen_laboral unidad_organica denominacion_puesto  modalidad_laboral asignado').exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de personal...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun registro del personal'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', PERS: resp })
                })
        }
}

function getper(req, res) {
        var id = req.params.id;
        PERS.findById(id).populate('escala_ocupacional nivel_ocupacional canton puesto_adicional regimen_laboral unidad_organica denominacion_puesto modalidad_laboral').exec((err, resp) => {
                if (err) return res.status(200).send({Message: 'error al ejectuar la peticion', Error: err});
                if (!resp) return res.status(404).send({Message: 'no existe el personal'});
                return res.status(200).send({Message: 'Personal Encontrado!!!...', PERS: resp})
        })
}

function findPer(req, res) {
        var id = req.params.id;
        PERS.findById(id).populate().exec((err, resp) => {
                if (err) return res.status(200).send({Message: 'error al ejectuar la peticion', Error: err});
                if (!resp) return res.status(404).send({Message: 'no existe el personal'});
                return res.status(200).send({Message: 'Personal Encontrado!!!...', PERS: resp})
        })
}
function cambiarEstado(req, res) {
        var id = req.body._id;
        var params = req.body;
        params.asignado = null;
        PERS.findByIdAndUpdate(id, params, {new:true}, (err, response)=> {
                if (err) return res.status(500).send({Message: 'Error al ejectuar la peticion... ', Error: err});
                if (!response || response.length <=0) return res.status(404).send({Message: 'No se encuentra el personal'});
                return res.status(200).send({Message: 'Personal editado con exito', personal: response});
                
        })
}
function findByCi(req, res) {
        var ci = req.params.ci;
        PERS.find({cedula: ci}, (error, response) => {
                if (error) return res.status(500).send({Message: 'Error al comunicarse con la vase de datos', Error: error});
                if (!response) return res.status(404).send({Message: 'Error al buscar el personal'});
                if (response && response.length <=0) return res.status(200).send({Message: 'Personal no encontrado'});
                return res.status(200).send({Message: 'Personal Encontrado', PER: response});
        })
}
function updatep(req, res) {
        var id = req.params.id;
        var params = req.body;
        params.asignado = null;
        params.memorandum = null;
        PERS.findByIdAndUpdate(id, params, {new : true}, (error, response) => {
            if (error) return res.status(500).send({message: 'error al ejectuar la peticion en el servidor....', error});
            if (!response) return res.status(404).send({message: 'no se pudo actualizar per', id: id});
            return res.status(200).send({message: 'per editado correctamente!!...', PER: response});
        })
    }

module.exports = {
        homeper,
        pruebaper,
        savePER,
        updatePer,
        getpers,
        getper,
        findPer,
        cambiarEstado,
        findByCi,
        updatep
}