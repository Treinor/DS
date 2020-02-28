'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var PersonalSchema = Schema({
        partida_individual: String,
        rmu_puesto: String,
        codigo_sucursal: String,
        cedula: String,
        nombres: String,
        apellidos: String,
        estructura_programatica: String,
        nivel_ocupacional: {type: Schema.ObjectId, ref: 'nivel_ocupacional'},
        regimen_laboral: {type: Schema.ObjectId, ref: 'regimen_laboral'},
        puesto_adicional: {type: Schema.ObjectId, ref: 'puesto_adicional'},
        denominacion_puesto:  {type: Schema.ObjectId, ref: 'denominacion_de_puesto'},
        modalidad_laboral:      {type: Schema.ObjectId, ref: 'modalidad_laboral'},
        unidad_organica:        {type: Schema.ObjectId, ref: 'unidad_organica'},
        escala_ocupacional:     {type: Schema.ObjectId, ref: 'escala_ocupacional'},
        provincia: String,
        canton: {type: Schema.ObjectId, ref: 'canton'},
        autor: { type: Schema.ObjectId, ref: 'funcionario'},
        fecha_autor: { type: String, default: moment().unix()},
        editor: { type: Schema.ObjectId, ref: 'funcionario'},
        fecha_editor: String,
        asignado: {type: Schema.ObjectId, ref: 'funcionario'},
        memorandum: String,
        codigoAP: String,
        activa: {type: Boolean, default: true}
});

module.exports = mongoose.model('personal', PersonalSchema);