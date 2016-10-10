'use strict';

var path = require('path'); 

var all = {
    /* Se normaliza el directorio raiz de la app */
    root: path.normalize(__dirname + '/../../..'),
    mongo:{
        options:{
            server:{socketOptions:{keepAlive: 1, connectTimeoutMS:3000}},
            replset:{socketOptions:{keepAlive:1, connectTimeoutMS:3000}}
        }
    }

};

module.exports = all;