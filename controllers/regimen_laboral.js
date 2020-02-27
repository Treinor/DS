'use strict'

var RLA = require('../models/regimen_laboral');
var moment = require('moment');
function homerl(req, res) {
        res.status(200).send({
            message:'Prueba de todo rl'
        });
    }

 function pruebarl(req, res) {
        res.status(200).send({
            message:'regimen laboral'
        });
    }

    function saveRL(req, res){
            var params = req.body;
            var RL= new RLA();
            
            if(params.regimen_laboral){

                RL.regimen_laboral = params.regimen_laboral  ;
                RL.codigo = params.codigo ;
                RL.autor = req.fun.sub;
                RL.fecha_autor = moment().unix();
                RL.editor = params.autor;
                RL.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            RL.save((err, rlStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar RL' }), console.error(err);
                if (rlStored) {
                        res.status(200).send({RL: rlStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el RL' });
                }
        });
    }

    function getRL(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                RLA.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de RL...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun RL'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', RLA: resp })
                })
        }
}
function getRLs(req, res) {
        var id = req.params.id;
        RLA.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'REGIMEN LABORAL Correctamente!!!', RL: response })
        })
}
function editarrl(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        RLA.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las REGIMEN LABORAL!!'});
                return res.status(200).send({Message: 'REGIMEN LABORAL guardada correctamente!!', RL: response});
        })
}
    module.exports = {
            homerl,
            pruebarl,
            saveRL,
            getRL,
            getRLs,
            editarrl
    }