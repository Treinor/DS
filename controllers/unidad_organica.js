'use strict'

var UOR = require('../models/unidad_organica');
var moment = require('moment');
function homeuo(req, res) {
        res.status(200).send({
            message:'Prueba de todo uo'
        });
    }

 function pruebauo(req, res) {
        res.status(200).send({
            message:'unidad organica'
        });
    }

    function saveUO(req, res){
            var params = req.body;
            var UO= new UOR();
            
            if(params.unidad_organica){

                UO.unidad_organica = params.unidad_organica  ;
                UO.codigo = params.codigo  ;
                UO.autor = req.fun.sub;
                UO.fecha_autor = moment().unix();
                UO.editor = params.autor;
                UO.fecha_editor = params.fecha_editor;
                
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            UO.save((err, uoStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar UO' }), console.error(err);
                if (uoStored) {
                        res.status(200).send({ UO: uoStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el UO' });
                }
        });
    }

    function getUO(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                UOR.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de UO...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun UO'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', UOR: resp })
                })
        }
}
function getUOs(req, res) {
        var id = req.params.id;
        UOR.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'UNIDAD ORGANICA Correctamente!!!', UO: response })
        })
}
function editaruo(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        UOR.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las UNIDAD ORGANICA!!'});
                return res.status(200).send({Message: 'UNIDAD ORGANICA guardada correctamente!!', UO: response});
        })
}
    module.exports = {
            homeuo,
            pruebauo,
            saveUO,
            getUO,
            getUOs,
            editaruo
    }