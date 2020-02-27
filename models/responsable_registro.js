'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var RGSchema = Schema({

        nombre: String,
        activa: {type: Boolean, default: true},
        autor: { type: Schema.ObjectId, ref: 'funcionario'},
        fecha_autor: { type: String, default: moment().unix()},
        editor: String,
        fecha_editor: String
});

module.exports = mongoose.model('responsable_registro', RGSchema);