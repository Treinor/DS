'use strict'

var RHU = require('../models/recursos_humanos');
var moment = require('moment');
function homerh(req, res) {
        res.status(200).send({
            message:'Prueba de todo rh'
        });
    }

 function pruebarh(req, res) {
        res.status(200).send({
            message:'recursos humanos'
        });
    }

    function saveRH(req, res){
            var params = req.body;
            var RH= new RHU();
            
            if(params.nombre){

                RH.nombre = params.nombre;
                RH.activa = true  ;
                RH.autor = req.fun.sub;
                RH.fecha_autor = moment().unix();
                RH.editor = params.autor;
                RH.fecha_editor = params.fecha_editor;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
            RH.save((err, rhStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar RH' }), console.error(err);
                if (rhStored) {
                        res.status(200).send({ RH: rhStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado la RH' });
                }
        });
    }
    function getRH(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                RHU.find().sort([
                        ['nombre', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de RH...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ninguna TH'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', RHU: resp })
                })
        }
}


function estadoRH(req, res) {
      
        var id = req.body._id;
        var activa = req.body.activa;
        RHU.findByIdAndUpdate(id, {activa}, {new:true}, (err, response)=> {
                if (err) return res.status(500).send({Message: 'Error al ejectuar la peticion... ', Error: err});
                if (!response || response.length <=0) return res.status(404).send({Message: 'No se encuentra la RH'});
                return res.status(200).send({Message: 'RH editada con exito'});
        })
}
function getRHs(req, res) {
        var id = req.params.id;
        RHU.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'RECURSOS HUMANOS Correctamente!!!', RH: response })
        })
}
function editarrh(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        RHU.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las RECURSOS HUMANOS!!'});
                return res.status(200).send({Message: 'RECURSOS HUMANOS guardada correctamente!!', RH: response});
        })
}

    module.exports = {
            homerh,
            pruebarh,
            saveRH,
            estadoRH,
            getRH,
            getRHs,
            editarrh
    }