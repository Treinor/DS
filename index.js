'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DST', {useMongoClient: true})
    .then(() => {
        console.log("Conexion correcta inge")

        //crear servidor
        app.listen(port, () => {
            console.log("Servidor Up!!! Puerto:3800")
        })
    })
    .catch(err => console.log(err));
