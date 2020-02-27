'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var FuncionarioSchema = Schema({
        ci_fun: String,
        nombres: String,
        apellidos: String,
        correo: String,
        telefono: String,
        direccion: String,
        usuario: String,
        password: String,
        titulo: String,
        role: String,
        activa: {type: Boolean, default: true}
});

module.exports = mongoose.model('funcionario', FuncionarioSchema);