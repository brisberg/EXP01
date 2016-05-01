/**
 * Created by Brandon Risberg on 4/28/2016.
 */

var express = require('express');
var path = require('path');

var app = express();

// db bootstrap (development only)
if (app.get('env') === 'development') {
    require('./app/config/database')('mongodb://localhost/exp01');


    var Ware = require('./app/models/wareModel');
    var Pilot = require('./app/models/pilotModel');
    var User = require('./app/models/userModel');
    var System = require('./app/models/systemModel');

    console.log('initDB');

    Ware.remove({}, function(err) {
        console.log('\ndropping Wares');

        // wares
        console.log('saving Trillium');
        new Ware({name:'Trillium', baseValue:400}).save();
        console.log('saving Dalaxian Wheat');
        new Ware({name:'Dalaxian Wheat', baseValue:50}).save();
        console.log('saving Microchips');
        new Ware({name:'Microchips', baseValue:1000}).save();
    });

    Pilot.remove({}, function(err) {
        console.log('\ndropping Pilots');

        // pilots
        console.log('saving Brennen');
        var brennen = new Pilot({name: 'Brennen'});

        Ware.findOne({ name: 'Trillium'}, function(err, doc) {
            brennen.inventory.push({'ware': doc, 'quantity':5});
            brennen.save();
        });
        brennen.save();

        console.log('saving Xin\'ui');
        new Pilot({name: 'Xin\'ui'}).save();
        console.log('saving Karas2');
        new Pilot({name: 'Karas2'}).save();
        console.log('saving Bria');
        new Pilot({name: 'Bria'}).save();
    });

    User.remove({}, function(err) {
        console.log('\ndropping Users');

        // users
        console.log('saving Brandon');
        new User({name: 'Brandon', email: 'brandon@example.com', passwordHash:'password'}).save();
    });

    System.remove({}, function(err) {
        console.log('\ndropping Systems');

        // systems
        console.log('saving Earth');
        new System({ name: 'Earth', subTitle: 'the Sol System', population: 8.54, wares:[]}).save();

    });
}
else {
    console.log('Only run initDb in development');
}
