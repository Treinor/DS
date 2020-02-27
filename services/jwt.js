'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'yu881024';
exports.createToken = function(FUN){
    var payload = {
        sub : FUN._id,
        id_fun : FUN.id_fun ,
        ci_fun : FUN.ci_fun,
        nombres : FUN.nombres,
        apellidos :	FUN.apellidos,
        fecha_nacimiento : FUN.fecha_nacimiento,
        pais_nacimiento : FUN.pais_nacimiento,
        correo : FUN.correo,
        telefono : FUN.telefono,
        direccion : FUN.direccion,
        usuario : FUN.usuario,
        role : FUN.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix



    };

    return jwt.encode(payload, secret);
};