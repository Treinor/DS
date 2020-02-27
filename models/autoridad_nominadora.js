'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var ANSchema = Schema({
        nombre: String,
        activa: {type: Boolean, default: true},
        autor: { type: Schema.ObjectId, ref: 'funcionario'},
        fecha_autor: { type: String, default: moment().unix()},
        editor: String,
        fecha_editor: String
});

module.exports = mongoose.model('autoridad_nominadora', ANSchema);
