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

    var docs = {};

    console.log('initDB');

    console.log('dropping Wares');
    Ware.remove({})
    .then(function() {
        console.log('dropping Pilots');
        return Pilot.remove({});
    }).then(function() {
        console.log('dropping Users');
        return User.remove({});
    }).then(function() {
        console.log('dropping Systems');
        return System.remove({});
    }).then(function() {

            // wares
            console.log('\ninserting Wares');
            console.log('adding Trillium');
            docs.trillium = new Ware({name:'Trillium', baseValue:400});
            console.log('adding Dalaxian Wheat');
            docs.dalaxianWheat = new Ware({name:'Dalaxian Wheat', baseValue:50});
            console.log('adding Microchips');
            docs.microchips = new Ware({name:'Microchips', baseValue:1000});

            // systems
            console.log('\ninserting Systems');
            console.log('adding Earth');
            docs.earth = new System({ name: 'Earth', subTitle: 'the Sol System', population: 8.54, wares:
                [
                    docs.trillium,
                    docs.microchips
                ]});

            // pilots
            console.log('\ninserting Pilots');
            console.log('adding Brennen');
            docs.brennen = new Pilot({name: 'Brennen', cash: 10000, inventory: [
                { ware: docs.trillium, quantity: 5 },
                { ware: docs.dalaxianWheat, quantity: 240 }
            ]});
            console.log('adding Xin\'ui');
            docs.xin = new Pilot({name: 'Xin\'ui', cash: 4000, inventory: [
                { ware: docs.dalaxianWheat, quantity: 120 }
            ]});
            console.log('adding Karas');
            docs.karas = new Pilot({name: 'Karas', cash: 5000, inventory: [
                { ware: docs.microchips, quantity: 8 }
            ]});
            console.log('adding Bria');
            docs.bria = new Pilot({name: 'Bria', cash: 20000});

            // users
            console.log('\ninserting Users');
            console.log('adding Brandon');
            docs.brandon = new User({name: 'Brandon', email: 'brandon@example.com', passwordHash:'password'});

            // Write to db
            console.log('\nSaving all docs');
            return global.Promise.all(Object.keys(docs).map(function(doc) {
                console.log('\tsaving ' + doc + '');
                return docs[doc].save();
            }));
    }).then(function() {
        process.exit();
    });
}
else {
    console.log('Only run initDb in development');
}
