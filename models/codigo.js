'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var CodSchema = Schema({
        codigo: String,
});

module.exports = mongoose.model('codigo', CodSchema);