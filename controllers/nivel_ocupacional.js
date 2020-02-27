'use strict'

var NOC = require('../models/nivel_ocupacional');
var moment = require('moment');
function homeno(req, res) {
        res.status(200).send({
            message:'Prueba de todo NO'
        });
    }

 function pruebano(req, res) {
        res.status(200).send({
            message:'nivel ocupacional'
        });
    }

    function saveNO(req, res){
            var params = req.body;
            var NO = new NOC();
            
            if(params.nivel_ocupacional){
                NO.nivel_ocupacional = params.nivel_ocupacional  ;
                NO.codigo = params.codigo  ;
                NO.autor = req.fun.sub;
                NO.fecha_autor = moment().unix();
                NO.editor = params.autor;
                NO.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            NO.save((err, noStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar NO' }), console.error(err);
                if (noStored) {
                        res.status(200).send({ NO: noStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el NO' });
                }
        });
    }

    function getNO(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                NOC.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de NO...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun NO'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', NOC: resp })
                })
        }
}
function getNOs(req, res) {
        var id = req.params.id;
        NOC.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'NIVEL OCUPACIONAL Correctamente!!!', NO: response })
        })
}
function editarno(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        NOC.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las NIVEL OCUPACIONAL!!'});
                return res.status(200).send({Message: 'NIVEL OCUPACIONAL guardada correctamente!!', NO: response});
        })
}

    module.exports = {
            homeno,
            pruebano,
            saveNO,
            getNO,
            getNOs,
            editarno
    }