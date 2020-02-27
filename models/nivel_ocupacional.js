'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var NOSchema = Schema({

        nivel_ocupacional: String,
        codigo: String,
        autor: { type: Schema.ObjectId, ref: 'funcionario'},
        fecha_autor: { type: String, default: moment().unix()},
        editor: String,
        fecha_editor: String
});

module.exports = mongoose.model('nivel_ocupacional', NOSchema);