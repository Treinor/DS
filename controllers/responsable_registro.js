'use strict'

var RRE = require('../models/responsable_registro');
var moment = require('moment');
function homerr(req, res) {
        res.status(200).send({
            message:'Prueba de todo rr'
        });
    }

 function pruebarr(req, res) {
        res.status(200).send({
            message:'responsable registro'
        });
    }

    function saveRR(req, res){
            var params = req.body;
            var RR= new RRE();
            
            if(params.nombre){

                RR.nombre = params.nombre  ;
                RR.activa = true;
                RR.autor = req.fun.sub;
                RR.fecha_autor = moment().unix();
                RR.editor = params.autor;
                RR.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            RR.save((err, rrStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar RR' }), console.error(err);
                if (rrStored) {
                        res.status(200).send({ RR: rrStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado la RR' });
                }
        });
    }


            function getRR(req, res) {

                if (!req.fun.sub) {
        
                        return res.status(401).send({
                                Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                        })
                } else {
        
                        RRE.find().sort([
                                ['nombre', 'asc']
                        ]).exec((err, resp) => {
                                if (err) return res.status(500).send({
                                        Message: 'no se pudo obtener la lista de RR...',
                                        Error: err
                                });
        
                                if (!resp) return res.status(404).send({
                                        Message: 'no se obtuvo ninguna RR'
                                });
                                return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', RRE: resp })
                        })
                }
        }

        function estadoRR(req, res) {
              
                var id = req.body._id;
                var activa = req.body.activa;
                RRE.findByIdAndUpdate(id, {activa}, {new:true}, (err, response)=> {
                        if (err) return res.status(500).send({Message: 'Error al ejectuar la peticion... ', Error: err});
                        if (!response || response.length <=0) return res.status(404).send({Message: 'No se encuentra la RR'});
                        return res.status(200).send({Message: 'RR editada con exito'});
                })
        }
        function getRRs(req, res) {
                var id = req.params.id;
                RRE.findById(id, (err, response) => {
                        if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                        if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                        return res.status(200).send({ Message: 'RESPONSABLE DEL REGISTRO Correctamente!!!', RR: response })
                })
        }
        function editarrr(req,res) {
                var id = req.params.id;
                var params = req.body;
                params.editor = req.fun.sub;
                 params.fecha_editor = moment().unix();
                RRE.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                        if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                        if (!response) return res.status(404).send({Message: 'Erorr al buscar las RESPONSABLES DEL REGISTRO!!'});
                        return res.status(200).send({Message: 'RESPONSABLE DEL REGISTRO guardada correctamente!!', RR: response});
                })
        }
    module.exports = {
            homerr,
            pruebarr,
            saveRR,
            getRR,
            estadoRR,
            getRRs,
            editarrr
    }