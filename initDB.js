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

            console.log('\ninserting Wares');
            // wares
            console.log('adding Trillium');
            var trillium = new Ware({name:'Trillium', baseValue:400});
            console.log('adding Dalaxian Wheat');
            var dalaxianWheat = new Ware({name:'Dalaxian Wheat', baseValue:50});
            console.log('adding Microchips');
            var microchips = new Ware({name:'Microchips', baseValue:1000});
            microchips.save();

            console.log('\ninserting Systems');
            // systems
            console.log('adding Earth');
            var earth = new System({ name: 'Earth', subTitle: 'the Sol System', population: 8.54, wares:
                [
                    trillium,
                    microchips
                ]});

            // pilots
            console.log('adding Brennen');
            var brennen = new Pilot({name: 'Brennen', cash: 10000, inventory: [
                { ware: trillium, quantity: 5 },
                { ware: dalaxianWheat, quantity: 240 }
            ]});
            console.log('adding Xin\'ui');
            var xin = new Pilot({name: 'Xin\'ui', cash: 4000, inventory: [
                { ware: dalaxianWheat, quantity: 120 }
            ]});
            console.log('adding Karas');
            var karas = new Pilot({name: 'Karas', cash: 5000, inventory: [
                { ware: microchips, quantity: 8 }
            ]});
            console.log('adding Bria');
            var bria = new Pilot({name: 'Bria', cash: 20000});

            console.log('\ninserting Users');
            // users
            console.log('adding Brandon');
            var brandon = new User({name: 'Brandon', email: 'brandon@example.com', passwordHash:'password'});

            console.log('\nsaving Wares');
            return trillium.save()
            .then(function() {
                return dalaxianWheat.save();
            }).then(function() {
                return microchips.save();
            }).then(function() {
                console.log('saving Systems');
                return earth.save();
            }).then(function() {
                console.log('saving Pilots');
                return brennen.save();
            }).then(function() {
                return xin.save();
            }).then(function() {
                return karas.save();
            }).then(function() {
                return bria.save();
            }).then(function() {
                console.log('saving Users');
                return brandon.save();
            });
    }).then(function() {
        process.exit();
    });
}
else {
    console.log('Only run initDb in development');
}
