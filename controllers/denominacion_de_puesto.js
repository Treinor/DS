'use strict'

var DDPU = require('../models/denominacion_de_puesto');
var moment = require('moment');

function homedp(req, res) {
        res.status(200).send({
            message:'Prueba de todo DP'
        });
    }

 function pruebadp(req, res) {
        res.status(200).send({
            message:'DENOMINACION DE PUESTO'
        });
    }

    function saveDP(req, res){
            var params = req.body;
            var DDP = new DDPU();
            
            if(params.denominacion_puesto){

                DDP.denominacion_puesto = params.denominacion_puesto ;
                DDP.codigo = params.codigo ;
                DDP.autor = req.fun.sub;
                DDP.fecha_autor = moment().unix();
                DDP.editor = params.autor;
                DDP.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            DDP.save((err, dpStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar denominacion de puesto ' }), console.error(err);
                if (dpStored) {
                        res.status(200).send({ DP: dpStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado la dp' });
                }
        });
    }

    function getDP(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                DDPU.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de dp...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun dp'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', DDPU: resp })
                })
        }
}
function getDPs(req, res) {
        var id = req.params.id;
        DDPU.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'DENOMINACION DE PUESTO Correctamente!!!', DDP: response })
        })
}
function editardp(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        DDPU.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las DENOMINACIONES DE PUESTO!'});
                return res.status(200).send({Message: 'DENOMINACION DE PUESTO guardada correctamente!!', DDP: response});
        })
}
function deletedp(req, res) {
        var id = req.params.id;
        DDPU.findByIdAndRemove(id, (err, APRemoved) => {
            if (err) return res.status(500).send({ message: 'Error al borrar Accion de personal' });
    
            if (!APRemoved) return res.status(404).send({ message: 'No se ha borrado accion de personal' });
    
            return res.status(200).send({ message: 'Accion de Personal Eliminada' })
        });
    }
    module.exports = {
            homedp,
            pruebadp,
            saveDP,
            getDP,
            getDPs,
            editardp,
            deletedp
    }