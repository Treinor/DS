'use strict'

var ANR = require('../models/autoridad_nominadora');
var moment = require('moment');

function homean(req, res) {
        res.status(200).send({
                message: 'Prueba de todo AN'
        });
}

function pruebaan(req, res) {
        res.status(200).send({
                message: 'Autoridad nominadora'
        });
}

function saveAN(req, res) {
        var params = req.body;
        var AN = new ANR();

        if (params.nombre) {

                AN.nombre = params.nombre;
                AN.activa = true;
                AN.autor = req.fun.sub;
                AN.fecha_autor = moment().unix();
                AN.editor = params.autor;
                AN.fecha_editor = params.fecha_editor;
        } else {
                res.status(200).send({
                        message: 'Faltan campos obligatorios!!'
                });

        }
        AN.save((err, anStored) => {
                if (err) return res.status(500).send({ message: 'Error al guardar autoridad nominadora' }), console.error(err);
                if (anStored) {
                        return res.status(200).send({ AN: anStored });
                } else {
                        return res.status(404).send({ message: 'No se ha registrado la autoridad' });
                }
        });
}
function getAN(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                ANR.find().sort([
                        ['nombre', 'asc']
                ]).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de autoridades nominadas...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ninguna autoridad'
                        });
                        if (resp.length <= 0) return res.status(200).send({ Message: 'No hay autoridades Actualmente!' });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', ANR: resp })
                })
        }
}
function getANs(req, res) {
        var id = req.params.id;
        ANR.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'error al ejectuar la peticion...', Error: err });
                if (!response) return res.status(404).send({ Message: 'error al devolver el objeto' });
                return res.status(200).send({ Message: 'Autoridades Cargadas Correctamente!!!', AN: response })
        })
}
function deleteAN(req, res) {
        var AN_id = req.body._id;
        var ANRemoved;
        ANR.findByIdAndRemove(id, (err => {
                if (err) return res.status(500).send({ message: 'Error al borrar Autoridad nominadora' });
                if (!ANRemoved) return res.status(404).send({ message: 'No se ha borrado la autoridad nominadora' });
                return res.status(200).send({ message: 'Autoridad nominadora Eliminada' })
        }));
}

function estadoan(req, res) {

        var id = req.body._id;
        var activa = req.body.activa;
        ANR.findByIdAndUpdate(id, { activa }, { new: true }, (err, response) => {
                if (err) return res.status(500).send({ Message: 'Error al ejecutar la peticion... ', Error: err });
                if (!response || response.length <= 0) return res.status(404).send({ Message: 'No se encuentra la autoridad nominadora' });
                return res.status(200).send({ Message: 'autoridad nominadora editada con exito' });
        })
}
function editarAn(req,res) {
        var id = req.params.id;
        var params = req.body;
        params.editor = req.fun.sub;
        params.fecha_editor = moment().unix();
        ANR.findByIdAndUpdate(id, params, {new: true}, (err, response) => {
                if (err) return res.status(500).status({Message: 'Error al ejecutar la peticionm . . .  ', Error: err});
                if (!response) return res.status(404).send({Message: 'Erorr al buscar las autoridades nominadoras!!'});
                return res.status(200).send({Message: 'Autoridad nominadora guardada correctamente!!', AN: response});
        })
}
module.exports = {
        homean,
        pruebaan,
        saveAN,
        deleteAN,
        getAN,
        getANs,
        estadoan,
        editarAn
}