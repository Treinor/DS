'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var CodbSchema = Schema({
        codigo: String,
});

module.exports = mongoose.model('codigob', CodbSchema);