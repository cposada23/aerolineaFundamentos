'use strict';

/**
 * Module dependencies.
 */
const express          = require('express');
const compression      = require('compression'); // Comprecion del response, mayor eficiencia a la hora de transmitir datos
const bodyParser       = require('body-parser'); //es utilizado para el parseo de los post (sean json o no) y nos devuelve el resultado del parsea accesible vía la variable req.body
const logger           = require('morgan');  //Mantiene el rastreo de los request, logs en la consola.
const errorHandler     = require('errorhandler');  //Manejo de errores. Se recomienda desactivarlo en produccion ya que envia informacion de mas sobre los errores al cliente
//const lusca            = require('lusca'); 
const dotenv           = require('dotenv');   //Cargar las variables de entorno, util en el desarrollo. Recordar que el archivo .env no debe ser monitorizado por git
const path             = require('path');  //Provee utilidades para el manejo de carpetas
//const mongoose         = require('mongoose');  //Mongoose para el uso de mongo db
const cors             = require('cors');   //Manejo de acceso a datos por las aplicaciones que no se encuentren en el mismo dominio (app movil)
var   expressValidator = require('express-validator'); //Validar los request, que estos esten bien formados

const TokenService  = require('../auth/services/TokenService'); 
const config        = require('./environment');

module.exports = function (app) {


    /* Puerto en el que corre la aplicació */
    app.set('port', process.env.PORT || 3000);

    app.use(compression());
    app.use(logger('dev'));
    /* Permito acceder a los recursos de mi aplicacion por aplicaciones moviles */
    app.use(cors({
        origin: '*',
        withCredentials: false,
        allowedHeaders: ['Content-Type', 'Authorization','x-forwarded-for', 'x-forwarded-proto','X-Requested-With', 'Accept', 'Origin' ]
    }));

    /**
     * inicializo req.body 
     * */
    app.use(bodyParser.json());
     /**
     * Manejo de errores con express validator
     */

    app.use(expressValidator());
    app.use(bodyParser.urlencoded({extended: true}));
   


    /**
     * Forzar HTTPS  en heroku
     */
    if(process.env.HEROKU === 'heroku'){
        app.use(function(req, res, next) {
            var protocol = req.get('x-forwarded-proto');
            protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
        });
    }


    /**
     * Token deserialization,
     * se verifica la existencia de la token y se extrae el payload del usuario
     * El pay load se usará en otras rutas
     */
    app.use((req, res, next) => {
        const token = new TokenService(req.headers);

        req.isAuthenticated = token.isAuthenticated;
        req.tokenPayload    = token.getPayload();
        req.user            = {
            _id: req.tokenPayload._id
        };

        next();
    });

/*
    app.use(lusca.xframe('SAMEORIGIN'));
    app.use(lusca.xssProtection(true));*/

    /**
     * directorios estaticos
     */
    app.use('/public', express.static(path.join(config.root, '/public')));
    app.use('/bower_components', express.static(path.join(config.root,'/bower_components')));
    //app.use('/node_modules' , express.static(path.join(config.root, '/node_modules')));
    app.use(errorHandler());

};