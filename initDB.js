/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');

var app = express()

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');

    var appHelpers = require(path.join(__dirname, 'app/helpers/appHelpers'))

    console.log("initDB");



}
else {
    console.log('Only run initDb in development');
}
