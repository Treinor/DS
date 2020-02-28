'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var FUNC = require('../models/funcionario');
var jwt = require('../services/jwt')
var mongoosePaginate = require('mongoose-pagination');
var AP = require('../models/accion_de_personal');

function homefun(req, res) {
        res.status(200).send({
                message: 'Prueba de todo FUN'
        });
}

function pruebafun(req, res) {
        res.status(200).send({
                message: 'FUNCIONARIO'
        });
}
//funcion registrar
function saveFUN(req, res) {
        var params = req.body;
        var FUN = new FUNC();

        if (params.ci_fun && params.nombres && params.apellidos && params.correo && params.telefono && params.direccion && params.usuario && params.password) {

                FUN.ci_fun = params.ci_fun;
                FUN.nombres = params.nombres;
                FUN.apellidos = params.apellidos;
                FUN.correo = params.correo;
                FUN.telefono = params.telefono;
                FUN.direccion = params.direccion;
                FUN.usuario = params.usuario;
                FUN.titulo = params.titulo;
                FUN.role = 'ROLE_USER';
                FUN.activa = true;




                //evitar usuarios repetidos
                FUNC.find({
                        $or: [{ correo: FUN.correo.toLowerCase() },
                        { usuario: FUN.usuario.toLowerCase() },
                        { ci_fun: FUN.ci_fun.toLowerCase() }

                        ]
                }).exec((err, funs) => {


                        if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' }), console.log(err);
                        if (funs && funs.length >= 1) {
                                return res.status(200).send({ message: 'El usuario que intenta registrar ya existe' })
                        } else {
                                //encriptacion contraseña
                                bcrypt.hash(params.password, null, null, (err, hash) => {
                                        FUN.password = hash;
                                        if (err) console.error(err);

                                        FUN.save((err, funStored) => {
                                                if (err) return res.status(500).send({ message: 'Error al guardar funcionario' }), console.error(err);
                                                if (funStored) {
                                                        res.status(200).send({ FUN: funStored });
                                                } else {
                                                        res.status(404).send({ message: 'No se ha registrado el funcionario' });
                                                }
                                        });

                                });
                        }

                });


        } else {
                res.status(200).send({
                        message: 'Faltan campos obligatorios del funcionario!!'
                });
        }
}
//logueo
function loguinFun(req, res) {
        var params = req.body;
        var correo = params.correo;
        var password = params.password;

        FUNC.findOne({ correo: correo }, (err, fun) => {
                if (err) return res.status(500).send({ message: 'Error de la peticion' });

                if (fun) {
                        bcrypt.compare(password, fun.password, (err, check) => {
                                if (check) {
                                        if (params.gettoken) {
                                                //generar y devolver tokem
                                                return res.status(200).send({
                                                        token: jwt.createToken(fun)
                                                });

                                        } else {
                                                //devolver datos de usuario
                                                fun.password = undefined;
                                                return res.status(200).send({ fun })
                                        }

                                } else {
                                        return res.status(404).send({ message: 'el usuario no se ha podido identificar' });
                                }
                        });
                } else {
                        return res.status(404).send({ message: 'el usuario no se ha podido identificar!!!' });
                }

        });

}

//Metodo para buscar 1 usuario especifico

function getFun(req, res) {
        var id_fun = req.params.id_fun;

        FUNC.findById(id_fun, (err, FUN) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });

                if (!FUN) return res.status(404).send({ message: 'El usuario no existe' });

                return res.status(200).send({ FUN });
        });
}

// Paginacion de usuarios
function getFunss(req, res) {
        var identity_fun_id = req.fun.sub;


        FUNC.find().sort('_id').paginate(page, (err, funs, total) => {
                if (err) return res.status(500).send({ message: 'Error al mostrar todos los funcionarios' })

                if (!funs) return res.status(404).send({ message: 'No hay usuarios disponibles' });

                return res.status(200).send({
                        funs,
                        total
                })
        });

}
function getFuns(req, res) {

        if (!req.fun.sub) {

                return res.status(401).send({
                        Message: 'No se puede Obtener Acceso a Los Registros Sin antes Ingresar al Sistema...'
                })
        } else {

                FUNC.find().sort([
                        ['apellidos', 'asc']
                ]).select({
                        'password': 0
                }).exec((err, resp) => {
                        if (err) return res.status(500).send({
                                Message: 'no se pudo obtener la lista de funcionarios...',
                                Error: err
                        });

                        if (!resp) return res.status(404).send({
                                Message: 'no se obtuvo ningun funcionarios'
                        });
                        return res.status(200).send({ Message: 'Lista Cargada Correctamente!!...', FUNC: resp })
                })
        }
}
function cambiarEstado(req, res) {

        var id = req.body._id;
        var activa = req.body.activa;
        FUNC.findByIdAndUpdate(id, { activa }, { new: true }, (err, response) => {
                if (err) return res.status(500).send({ Message: 'Error al ejectuar la peticion... ', Error: err });
                if (!response || response.length <= 0) return res.status(404).send({ Message: 'No se encuentra el funcionario' });
                return res.status(200).send({ Message: 'Funcionario editado con exito' });
        })
}
function cambiarrol(req, res) {
        var id = req.body._id;
        var role = req.body.role;
        console.log(role);
        
        FUNC.findByIdAndUpdate(id, { role }, { new: true }, (err, response) => {
                if (err) return res.status(500).send({ Message: 'Error al ejectuar la peticion... ', Error: err });
                if (!response || response.length <= 0) return res.status(404).send({ Message: 'No se encuentra el funcionario' });
                return res.status(200).send({ Message: 'Funcionario editado con exito' });
        })
}
// Edicion de datos de funcionarios

function updateFun(req, res) {
        var fun_id = req.params.id_fun;
        var update = req.body;

        //borrar propiedad password


        delete update.ci_fun

        if (fun_id != req.fun.sub) {
                return res.status(500).send({ message: 'No tiene los permisos para cambiar esto' })
        }
        FUNC.find({
                $or: [{ correo: update.correo.toLowerCase() },
                { usuario: update.usuario.toLowerCase() }

                ]
        }).exec((err, funs) => {

                var fun_isset = false;
                funs.forEach((fun) => {
                        if (fun && fun._id != fun_id) fun_isset = true;
                });
                if (fun_isset) return res.status(404).send({ message: 'Los datos ya estan en uso' });

                FUNC.findByIdAndUpdate(fun_id, update, { new: true }, (err, funUpdated) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })

                        if (!funUpdated) return res.status(404).send({ message: 'No se ha podido actulizar el funcionario' });

                        return res.status(200).send({ fun: funUpdated })
                });
        });


}
function updateFuns(req, res) {
        var fun_id = req.body._id;
        var update = req.body;

        //borrar propiedad password

        delete update.ci_fun

        FUNC.find({
                $or: [{ correo: update.correo.toLowerCase() },
                { usuario: update.usuario.toLowerCase() }

                ]
        }).exec((err, funs) => {

                var fun_isset = false;
                funs.forEach((fun) => {
                        if (fun && fun._id != fun_id) fun_isset = true;
                });
                if (fun_isset) return res.status(404).send({ message: 'Los datos ya estan en uso' });

                FUNC.findByIdAndUpdate(fun_id, update, { new: true }, (err, funUpdated) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })

                        if (!funUpdated) return res.status(404).send({ message: 'No se ha podido actulizar el funcionario' });

                        return res.status(200).send({ fun: funUpdated })
                });
        });


}
/*         async function getCountap(fun_id, ap_id){
         try {       
        var ADP = await AP.findOne({fun: fun_id, ap: ap_id}).exec()
        .then((ADP) => {
            return ADP;
        })
        .catch((err) => {
            return handleError(err);
        });
        return{
                ADP: ADP
        }
} catch (e) {
        console.log(e);
    }
}
 */

function passwordChange(req, res) {
                var id = req.params.id;
                var password = req.body;
                FUNC.findById(id, (err, response) => {
                    if (err) return res.status(500).send({Message: 'error al ejecutar la peticion en el servidor'})
                    if (!response) return res.status(404).send({Message: 'No se pudo identificar el usuario'});
                    bcrypt.hash(password.password, null, null, function (err, hash) {
                        if (hash) {
                            var password = hash;
                            FUNC.findByIdAndUpdate(id, {password: password}, (err, response) => {
                                if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor', Error: err});
                                if (!response) return res.status(404).send({Message: 'No se pudo editar la contraseña..'});
                                return res.status(200).send({Message: 'Contraseña editada de forma Exitosa!', fun: response});
                            })
                        }
                        else {
                            return res.status(404).send({ message: 'contraseña incorrecta!' });
                        }
                    });
                })
            }

function passwordCompare(req, res) {
        var id = req.params.id;
        var passworda = req.body.password;
        FUNC.findById(id, (err, response) => {
                if (err) return res.status(500).send({ Message: 'Error al comprobar contrase', err });
                if (!response) return res.status(404).send({ Message: 'no se pudo comprobar la contrase' });
                bcrypt.compare(passworda, response.password, function (err, check) {
                        if (check) {
                                return res.status(200).send({ Message: 'Comprobacion Exitosa', check })

                        } else {
                                return res.status(404).send({ Message: 'Error al comparar las contrase' });
                        }
                        // if (check == true) return res.status(200).send({Message: 'Comprobacion Exitosa, Contrase iguales'})
                        // if (check == false) return res.status(200).send({Message: 'Comprobacion Fallida, las contrase no coinciden'});

                })
        })
}
module.exports = {
        homefun,
        pruebafun,
        saveFUN,
        loguinFun,
        getFun,
        getFunss,
        getFuns,
        updateFun,
        updateFuns,
        cambiarEstado,
        passwordChange,
        passwordCompare,
        cambiarrol
        //getCountap
}