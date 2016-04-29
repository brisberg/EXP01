/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');

var app = express()

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');

    var Pilot = require('./app/models/pilotModel');
    var User = require('./app/models/userModel');

    console.log("initDB");

    // pilots
    var p1 = new Pilot({ id: 1, name: "Brennen"});
    p1.save();

    //process.exit()
}
else {
    console.log('Only run initDb in development');
}
