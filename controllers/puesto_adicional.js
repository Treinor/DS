'use strict'

var PADI = require('../models/puesto_adicional');
var moment = require('moment');
function homepad(req, res) {
        res.status(200).send({
            message:'Prueba de todo PAD'
        });
    }

 function pruebapad(req, res) {
        res.status(200).send({
            message:'PUESTO ADICIONAL'
        });
    }

    function savePAD(req, res){
            var params = req.body;
            var PAD= new PADI();
            
            if(params.puesto_adicional){

                PAD.puesto_adicional = params.puesto_adicional  ;
                PAD.codigo = params.codigo ;
                PAD.autor = req.fun.sub;
                PAD.fecha_autor = moment().unix();
                PAD.editor = params.autor;
                PAD.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            PAD.save((err, padStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar PAD' }), console.error(err);
                if (padStored) {
                        res.status(200).send({ PAD: padStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el PAD' });
                }
        });
    }

    function getPAD(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                PADI.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de PAD...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun PAD'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', PADI: resp })
                })
        }
}
function getPADs(req, res) {
        var id = req.params.id;
        PADI.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'PUESTO ADICIONAL Correctamente!!!', PAD: response })
        })
}
function editarpad(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        PADI.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las PUESTO ADICIONAL!!'});
                return res.status(200).send({Message: 'PUESTO ADICIONAL guardada correctamente!!', PAD: response});
        })
}

    module.exports = {
            homepad,
            pruebapad,
            savePAD,
            getPAD,
            getPADs,
            editarpad
    }