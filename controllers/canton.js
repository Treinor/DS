'use strict'

var CAN = require('../models/canton');
var moment = require('moment');

function homeca(req, res) {
        res.status(200).send({
                message: 'Prueba de todo CA'
        });
}

function pruebaca(req, res) {
        res.status(200).send({
                message: 'CANTON'
        });
}

function saveCA(req, res) {
        var params = req.body;
        var CA = new CAN();

        if (params.nombre) {
                CA.nombre = params.nombre;
                CA.codigo = params.codigo;
                CA.autor = req.fun.sub;
                CA.fecha_autor = moment().unix();
                CA.editor = params.autor;
                CA.fecha_editor = params.fecha_editor;
        } else {
                res.status(200).send({
                        message: 'Faltan campos obligatorios!!'
                });
        }
        CA.save((err, caStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar canton' }), console.error(err);
                if (caStored) {
                        res.status(200).send({ CA: caStored });
                } else {
                        res.status(404).send({ message: 'No se ha registrado el canton' });
                }
        });
}

function getCA(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                CAN.find().sort([
                        ['nombre', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de cantones...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun canton'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', CAN: resp })
                })
        }
}

function getCAs(req, res) {
        var id = req.params.id;
        CAN.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'CANTON Cargadas Correctamente!!!', CA: response })
        })
}
function editarcn(req, res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        CAN.findByIdAndUpdate(id, params, { new: true }, (err, response) => {
                if (err) return res.status(500).status({ Message: 'Error al ejecutar la peticionm . . .  ', Error: err });
                if (!response) return res.status(404).send({ Message: 'Erorr al buscar CANTONES!!' });
                return res.status(200).send({ Message: 'CANTON guardada correctamente!!', CA: response });
        })
}
module.exports = {
        homeca,
        pruebaca,
        saveCA,
        getCA,
        getCAs,
        editarcn
}