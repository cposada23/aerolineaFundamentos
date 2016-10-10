'use strict';

var path   = require('path');
var config = require('../config/environment');

module.exports = function (app) {


    /* AUTENTICACIÓN */
    app.use('/auth', require('../auth'));


    /* RAIZ */
    app.route('/').get(function (req, res) {
        res.sendFile(path.join(config.root, '/public/index.html'));
    });
};