'use strict'

var EOS = require('../models/escala_ocupacional');
var moment = require('moment');
function homeeo(req, res) {
        res.status(200).send({
            message:'Prueba de todo EO'
        });
    }

 function pruebaeo(req, res) {
        res.status(200).send({
            message:'ESCALA OCUPACIONAL'
        });
    }

    function saveEO(req, res){
            var params = req.body;
            var EO = new EOS();
            
            if(params.escala_ocupacional){
                EO.escala_ocupacional = params.escala_ocupacional  ;
                EO.codigo = params.codigo  ;
                EO.autor = req.fun.sub;
                EO.fecha_autor = moment().unix();
                EO.editor = params.autor;
                EO.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            EO.save((err, eoStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar eo ' }), console.error(err);
                if (eoStored) {
                        res.status(200).send({ EO: eoStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado la eo' });
                }
        });
    }

    function getEO(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                EOS.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de eo...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun eo'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', EOS: resp })
                })
        }
}
function getEOs(req, res) {
        var id = req.params.id;
        EOS.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'ESCALA OCUPACIONAL Correctamente!!!', EO: response })
        })
}
function editareo(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        EOS.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las escala ocupacional!!'});
                return res.status(200).send({Message: 'Escala ocupacional guardada correctamente!!', EO: response});
        })
}
    module.exports = {
            homeeo,
            pruebaeo,
            saveEO,
            getEO,
            getEOs,
            editareo
    }