/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');

var app = express();

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');

    var Pilot = require('./app/models/pilotModel');
    var User = require('./app/models/userModel');

    console.log("initDB");

    Pilot.remove({}, function(err) {
        console.log('\ndropping Pilots');

        // pilots
        console.log("saving Brennen");
        new Pilot({name: "Brennen"}).save();
        console.log("saving Xin\'ui");
        new Pilot({name: "Xin\'ui"}).save();
        console.log("saving Karas2");
        new Pilot({name: "Karas2"}).save();
        console.log("saving Bria");
        new Pilot({name: "Bria"}).save();
    });

    User.remove({}, function(err) {
        console.log('\ndropping Users');

        // users
        console.log("saving Brandon");
        new User({name: "Brandon", email: "brandon@example.com", passwordHash:"password"}).save();
    });
}
else {
    console.log('Only run initDb in development');
}
