'use strict'

var PROV = require('../models/provincia');

function homepro(req, res) {
        res.status(200).send({
            message:'Prueba de todo pais'
        });
    }

 function pruebapro(req, res) {
        res.status(200).send({
            message:'pais'
        });
    }

    function savePRO(req, res){
            var params = req.body;
            var PRO= new PROV();
            
            if(params.nombre){
                PRO.nombre = params.nombre  ;
            }else{
                    res.status(200).send({
                            message: 'Faltan campos obligatorios!!'
                    });
            }
    }

    module.exports = {
            homepro,
            pruebapro,
            savePRO
    }