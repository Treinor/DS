'use strict'

var COD = require('../models/codigob');
var moment = require('moment');

function saveCO(req, res) {
        var params = req.body;
        var CO = new COD();
        console.log('ingresando codigo nuevo');

        if (params.codigo) {
                CO.codigo = params.codigo;
        } else {
                return res.status(200).send({
                        message: 'Faltan campos obligatorios!!'
                });
        }


        CO.save((err, coStorage) => {
                if (err) return res.status(500).send({ message: 'Error al guardar CO' }), console.error(err);
                if (coStorage) {
                        return res.status(200).send({ CO: coStorage });
                } else {
                        return res.status(404).send({ message: 'No se ha registrado el CO' });
                }
        });
}

function getCO(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                COD.find().sort([
                        ['codigo', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de CO...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun CO'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', COD: resp })
                })
        }
}

function deleteCO(req, res) {
        var CO_id = req.params.id;
        COD.findByIdAndRemove(CO_id, (err, APRemoved) => {
            if (err) return res.status(500).send({ message: 'Error al borrar CODIGO' });
    
            if (!APRemoved) return res.status(404).send({ message: 'No se ha borrado CODIGO' });
    
            return res.status(200).send({ message: 'CODIGO Eliminada' })
        });
    }

function editarCO(req, res) {
        var id = req.params.id;
        var params = req.body;
        COD.findByIdAndUpdate(id, params, { new: true }, (err, response) => {
                if (err) return res.status(500).status({ Message: 'Error al ejecutar la peticionm . . .  ', Error: err });
                if (!response) return res.status(404).send({ Message: 'Erorr al buscar las CO!!' });
                return res.status(200).send({ Message: 'CO guardada correctamente!!', CO: response });
        })
}
module.exports = {
        saveCO,
        getCO,
        editarCO,
        deleteCO
}