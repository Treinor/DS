'use strict'

var MLA = require('../models/modalidad_laboral');
var moment = require('moment');
function homeml(req, res) {
        res.status(200).send({
            message:'Prueba de todo ML'
        });
    }

 function pruebaml(req, res) {
        res.status(200).send({
            message:'MODALIDAD LABORAL'
        });
    }

    function saveML(req, res){
            var params = req.body;
            var ML = new MLA();
            
            if(params.modalidad_laboral){

                ML.modalidad_laboral = params.modalidad_laboral  ;
                ML.autor = req.fun.sub;
                ML.fecha_autor = moment().unix();
                ML.editor = params.autor;
                ML.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            ML.save((err, mlStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar ML' }), console.error(err);
                if (mlStored) {
                        res.status(200).send({ ML: mlStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el ML' });
                }
        });
    }

    function getML(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                MLA.find().sort([
                        ['modalidad_laboral', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de ML...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun ML'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', MLA: resp })
                })
        }
}
function getMLs(req, res) {
        var id = req.params.id;
        MLA.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'Autoridades Cargadas Correctamente!!!', ML: response })
        })
}
function editarml(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        MLA.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las MODALIDAD LABORAL!!'});
                return res.status(200).send({Message: 'MODALIDA LABORAL guardada correctamente!!', ML: response});
        })
}
    module.exports = {
            homeml,
            pruebaml,
            saveML,
            getML,
            getMLs,
            editarml
    }