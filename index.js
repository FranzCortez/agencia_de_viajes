// importa express
//const express = require('express');
// v2
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path:"variables.env"});

// Conectar db
db.authenticate()
    .then( () => console.log("base de datos conectada") )
    .catch( error => console.log(error) );

// ejecuta express
const app = express();

// Habilitar PUG
app.set('view engine', 'pug');

// PROPIO MIDDLEWARE -- obtner año actual
app.use( (req, res, next) => {
    
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    
    return next();
});

// Agregar body parser para leer datos del form
app.use(express.urlencoded({extended: true}));

// Definir carpeta publica
app.use(express.static('public'));

// agregar router
app.use('/', router);



/** puertos hijos para la app    Solo heroku asigna */
const host = process.env.HOST || '0.0.0.0';

// define el puerto
const port = process.env.PORT || 4000;

// inica el sv
app.listen(port, host, () => {
    console.log("el servidor esta funcionando");
});
